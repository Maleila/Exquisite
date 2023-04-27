<script>
import { nextTick } from "vue";
import contenteditable from "vue-contenteditable";
import LocalViewStory from "@/views/LocalViewStory.vue";
import InkButtonVS from "@/views/InkButtonVS.vue";
import InkButtonB from "@/views/InkButtonB.vue";
import { useDatabase } from "vuefire";
import { ref as dbRef, set, onValue } from "firebase/database";

export default {
  components: {
    contenteditable,
    LocalViewStory,
    InkButtonVS,
    InkButtonB,
  },
  //called when a component is added (ex when the page loads)
  mounted() {
    this.focusInput();

    this.playerIndex = this.playerNames.indexOf(this.thisPlayer);
    console.log("index: " + this.playerIndex);

    this.formatAuthors();

    if (this.remote) {
      this.mutable = false;
      const db = useDatabase();
      const currentFB = dbRef(db, this.roomCode + "/gameAttributes");
      //^^it would be much better to listen specifically to /gameAttributes/zcount but when I tried that before it caused issues
      // - look at it again later

      //listen for changes to whose turn it is based on zcount in firebase
      onValue(currentFB, (snapshot) => {
        const data = snapshot.val();
        const currentPlayerFB = Object.values(data);
        this.zcount = currentPlayerFB[1];
        this.currentPlayer = this.playerNames[this.zcount];
        console.log("current according to fb " + this.currentPlayer);
        console.log("this player: " + this.thisPlayer);
        this.onTurnChange();
      });

      const sentencesFB = dbRef(db, this.roomCode + "/players");

      //listen for changes to the ongoing story
      onValue(sentencesFB, (snapshot) => {
        const data = snapshot.val();
        this.sentenceArray = Object.values(data);
      });
    }
  },
  data() {
    return {
      current: "",
      currentPlayer: "",
      playerIndex: 0,
      count: 1,
      finished: false,
      story: "",
      previous: "",
      following: "",
      invis: false,
      mutable: true,
      zcount: 0,
      sentenceArray: [],
      turnMessage: "",
      promptMessage: "",
      authors: "",
    };
  },
  methods: {
    //called on change to zcount in firebase
    onTurnChange() {
      this.mutable = false;
      console.log("turn changed!");
      console.log("zcount: " + this.zcount);
      if (this.zcount <= this.playerIndex) {
        //if it's not yet this player's turn
        if (this.playerIndex > 0 && this.zcount > 0) {
          const recent = this.zcount - 1;
          console.log("most recent player: " + recent);
          console.log("most recent sentence: " + this.sentenceArray[recent]);
          if (recent == this.playerIndex - 1) {
            //if the last player to submit was immediately previous to this player
            this.previous = this.sentenceArray[recent];
          } else {
            //else add the most recent sentence to the invisible portion of the story
            this.story = this.story.concat(this.sentenceArray[recent] + " ");
          }
        }
      } else if (this.zcount > this.playerIndex + 1) { //+1 so it doesn't grab the user's own sentence
        const recent = this.zcount - 1;

        this.following = this.following.concat(this.sentenceArray[recent] + " ")
      }
      if (this.zcount == this.playerIndex) {
        this.turnMessage = "Your turn!";
        this.promptMessage = "Enter to submit"
        this.mutable = true;
        this.focusInput();
      } else if(this.zcount < this.playerNum) {
        this.turnMessage = "Waiting...";
        this.promptMessage = "Hi " + this.thisPlayer + ", " + this.currentPlayer + " (" + (this.zcount + 1 ) + "/" + this.playerNum + ") is typing...";
      } else if (this.zcount == this.playerNum) { //maybe I want to wait on this until u click the button?
        this.turnMessage = "Completed Story";
        this.promptMessage = "By " + this.authors;
        setTimeout(() => this.finalTransition(), 960); //needs to wait the 900 ms for the last player's sentence to update
      }
    },
    //sets this.authors to String of playerNames with commas and "and"
    formatAuthors(){
      let formatted = "";
      for (let i = 0; i < this.playerNames.length - 1; i++) {
        formatted = formatted.concat(this.playerNames[i] + ", ")
      }
      formatted = formatted.concat("and " + this.playerNames[this.playerNames.length - 1])
      this.authors = formatted;
    },
    //reset game to play again (only used for local at the moment)
    reset() {
      this.current = "";
      this.count = 1;
      this.finished = false;
      this.mutable = true;
      this.story = "";
      this.previous = "";
      this.focusInput();
    },
    //triggered on enter in contenteditable (ie when a player submits their sentence)
    submitStory() {
      this.invis = true;
      this.mutable = false;
      setTimeout(() => this.transition(), 900);
    },
    //handles css fade effect and updates the ongoing story
    transition() {
      if (this.remote) {
        const db = useDatabase();
        const messageFB = dbRef(
          db,
          this.roomCode + "/players/" + this.thisPlayer
        );
        set(messageFB, this.current);
        const zcountFB = dbRef(db, this.roomCode + "/gameAttributes/zcount");
        this.zcount++;
        set(zcountFB, this.zcount);
      }
      this.count++;
      this.story = this.story.concat(this.previous + " ");

      //remove transition for resetting opacity to 1, then re-add after the story is updated
      //might want to make this its own method actually
      var prev = document.getElementById("prev");
      prev.classList.add("notransition");
      prev.style.opacity = 0.5;
      prev.offsetHeight;
      prev.classList.remove("notransition");

      var editable = document.getElementById("editable");
      editable.classList.add("notransition");
      editable.style.opacity = 1;
      editable.offsetHeight;
      editable.classList.remove("notransition");

      this.invis = false;
      this.previous = this.current;
      this.current = "";

      if (!this.remote && this.count <= this.playerNum) {
        this.mutable = true;
      } else if (!this.remote && this.count > this.playerNum) {
        this.finalTransition();
      }
      this.focusInput();
    },
    finalTransition(){
      console.log("previous: " + this.previous);
      this.invis = true;
      setTimeout(() => {
        this.story = this.story.concat(this.previous + " ");
        this.previous = "";
      }, 900);
    },
    //used for a previous method of viewing the story (when that was part of this component) -- not in use
    viewStory() {
      if (!this.remote) {
      this.story = this.story.concat(this.previous);
      this.previous = "";
      } else {
        this.story = "";
        for (let i = 0; i < this.sentenceArray.length; i++) {
          this.story = this.story.concat(this.sentenceArray[i] + " ");
          console.log("story: " + this.story);
        }
      }
      this.finished = true;
    },
    //refocuses on the contenteditable (which is not otherwise visible)
    focusInput() {
      nextTick(() => {
        // Without the try and catch: Error message is: Uncaught (in promise) TypeError: Cannot read properties of undefined (reading 'focus')
        // Need a try and catch block b/c you can only access the ref after the component is mounted. So the first render this.$ref.storyInput is going to be null and raise a promise error. This try and catch block doesn't change the overall logic of this method and only serves as a way to reduce any errors on console. Reference: https://vuejs.org/guide/essentials/template-refs.html#accessing-the-refs
        try {
          //this.$refs.storyInput.focus(); //need this bc vue gets confused since the input field has a v-if
          document.getElementById("editable").focus();
        } catch (ex) {
          // Print out the error message
          console.log("Error detected: " + ex);
        }
      });
    },
  },
  props: {
    playerNum: {
      type: Number,
      required: true,
    },
    playerNames: {
      type: Array,
      required: true,
    },
    remote: {
      type: Boolean,
      required: true,
    },
    host: {
      type: Boolean,
      required: true,
    },
    roomCode: {
      type: String,
      required: true,
    },
    thisPlayer: {
      type: String,
      required: true,
    },
  },
};
</script>

<template>
  <div class="main-game">
    <h2>
      <div class="roomcode" v-if="remote">RoomCode={{ roomCode }}</div>
      <div class="title" v-if="remote">{{ turnMessage }}</div>
      <div v-if="!remote && count <= playerNum" class="title">
        Player {{ count }} of {{ playerNum }}: {{ playerNames[count - 1] }}
      </div>
      <div v-if="!remote && count > playerNum" class="title">
        Completed Story
      </div>

      <div v-if="true"> <!--should definitely get rid of this-->
        <div class="prompt" v-if="!remote && count <= playerNum">ENTER to submit</div>
        <div class="prompt" v-if="!remote && count > playerNum">By {{ authors }}</div>
        <div class="prompt" v-if="remote">{{ promptMessage }}</div>

        <br />
        <div class="story">
          <span
            class="invisible"
            id="invisible"
            :style="{
              opacity: finished ? 1 : 0.01,
            }"
          >
            {{ story }}
          </span>
          <span
            class="previous-sentence"
            id="prev"
            :style="{
              opacity: invis ? 0.01 : 0.5,
            }"
            v-if="count > 0 && !finished"
          >
            {{ previous + " " }}
          </span>
          <contenteditable
            v-if="!finished"
            tag="div"
            :style="{
              opacity: invis ? 0.5 : 1,
            }"
            :contenteditable="mutable"
            class="new-text"
            id="editable"
            ref="storyInput"
            :no-nl="true"
            :no-html="true"
            v-model="current"
            @keydown.enter="submitStory"
          >
          </contenteditable>
          <span
            v-if="!finished"
            class="invisible"
            id="after"
          >
            {{ following }}
          </span>
        </div>
      </div>
    </h2>

    <div v-if="!finished" class="view-story">
      <button
        v-if="
          (count > playerNum) || (remote && zcount >= playerNum)
        "
        @click="viewStory"
      >View story</button>
    </div>

    <button @click="reset" v-if="finished && !remote">
      Play Again
    </button>

  </div>
</template>

<style scoped>
h3 {
  text-align: left !important;
}

.story {
  color: black;
  text-align: left !important;
}

.story .invisible {
  opacity: 0.01;
  filter: opacity(100);
  transition: opacity 3000ms ease-in-out;
}

.story .previous-sentence {
  color: black;
  filter: opacity(100);
  transition: opacity 900ms ease-in-out;
  text-align: left !important;
}

.story .new-text {
  color: black;
  filter: opacity(100);
  transition: opacity 900ms ease-in-out;
  text-align: left !important;
  display: inline-block;
}
.story .new-text:focus-visible {
  outline: none !important;
}
.notransition {
  transition: none !important;
}

.main-game .story {
  width: 90%;
  margin: 0 auto;
  text-align: left;
  font-family: Desyre;
  font-size: 2em;
  position: static;
  margin-top: 5%;
}

.main-game .title {
  /* font-family: Desyre; */
  font-size: 2em;
  width: 80%;
  margin: 0 auto;
  font-weight: 200;
  text-align: left;
  position: fixed;
}

.main-game .roomcode {
  top: 9%;
  color: #484848;
  font-size: 0.8em;
  width: 80%;
  margin: 0 auto;
  font-weight: 100;
  text-align: left;
  position: fixed;
}

.main-game .prompt {
  color: #484848;
  font-size: 0.8em;
  width: 80%;
  margin: 0 auto;
  font-weight: 100;
  text-align: left;
  position: fixed;
  top: 20%;
}

.main-game .view-story {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
}

.main-game .view-story button {
  background-color: transparent;
  /* border: none; */
  border-radius: 20px;
  /* font-family: CalorieRegular; */
  font-family: inherit;
  text-align: center;
  display: block;
  margin: 0 auto;
  font-size: 2em;
  padding: 10px 20px;
}
</style>
