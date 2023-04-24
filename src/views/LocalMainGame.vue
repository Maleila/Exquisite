<script>
import { nextTick } from "vue";
import contenteditable from "vue-contenteditable";
import LocalViewStory from "@/views/LocalViewStory.vue";
import InkButtonVS from "@/views/InkButtonVS.vue";
import { useDatabase, useDatabaseObject } from "vuefire";
import { ref as dbRef, set, onDisconnect, onValue } from "firebase/database";

export default {
  components: {
    contenteditable,
    LocalViewStory,
    InkButtonVS,
  },
  //called when a component is added (ex when the page loads)
  mounted() {
    this.focusInput();

    this.playerIndex = this.playerNames.indexOf(this.thisPlayer);
    console.log("index: " + this.playerIndex);

    if (this.remote) {
      this.mutable = false;
      const db = useDatabase();
      const currentFB = dbRef(db, this.roomCode + "/gameAttributes");

      //listen for changes to whose turn it is -- atm I think it gets called twice per turn change, once for zcount change and once for currentplayer change
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
      invis: false,
      mutable: true,
      zcount: 0,
      sentenceArray: [],
    };
  },
  methods: {
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
      }
      if (this.zcount == this.playerIndex) {
        this.mutable = true;
        this.focusInput();
      }
    },
    //send the finished story to LocalViewStory
    passStory() {
      if (!this.remote) {
        this.story = this.story.concat(this.previous);
      } else {
        this.story = "";
        for (let i = 0; i < this.sentenceArray.length; i++) {
          this.story = this.story.concat(this.sentenceArray[i] + " ");
          console.log("story: " + this.story);
        }
      }
      const { story } = this;
      this.$router.push({ name: "LocalViewStory", query: { story } });
    },
    //reset game to play again (outdated, not in use at the moment)
    reset() {
      this.current = "";
      this.count = 1;
      this.finished = false;
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

      if (!this.remote) {
        this.mutable = true;
      }
      this.focusInput();
    },
    //used for a previous method of viewing the story (when that was part of this component) -- not in use
    viewStory() {
      this.story = this.story.concat(this.previous);
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
    <h2 v-if="!finished && count <= playerNum && zcount < playerNum">
      <div class="roomcode" v-if="remote">RoomCode={{ roomCode }}</div>
      <div class="title" v-if="remote && playerIndex == zcount">Your turn!</div>
      <div class="title" v-if="remote && playerIndex != zcount">Waiting...</div>
      <div v-if="!remote" class="title">
        Player {{ count }} of {{ playerNum }}: {{ playerNames[count - 1] }}
      </div>

      <!--<div v-if="!remote || remote && playerIndex == zcount">-->
      <div v-if="true">
        <div class="prompt" v-if="playerIndex == zcount">ENTER to submit</div>
        <div class="prompt" v-if="remote && playerIndex != zcount">
          Hi {{ thisPlayer }}, {{ currentPlayer }} ({{ zcount + 1 }}/{{
            playerNum
          }}) is typing ....
        </div>

        <br />
        <div class="story">
          <span
            class="invisible"
            id="invisible"
            :style="{
              opacity: remote ? 0.1 : 0.01,
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
            v-if="count > 0"
          >
            {{ previous + " " }}
          </span>
          <contenteditable
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
        </div>
      </div>
    </h2>

    <div class="view-story">
      <InkButtonVS
        v-if="
          (count > playerNum && !finished) || (remote && zcount >= playerNum)
        "
        @click="passStory"
        role="link"
      />
    </div>

    <div class="story">
      <h3 v-if="finished && count > playerNum">{{ story }}</h3>
    </div>
    <br />
    <button @click="reset" v-if="finished && count > playerNum">
      Play Again
    </button>
    <!-- No play again button? -->
  </div>
</template>

<style scoped>
h3 {
  text-align: left !important;
}

#editable:after {
  content: "";
  display: inline-block;
  width: 2em;
}

.story {
  color: black;
  text-align: left !important;
}

.story .invisible {
  opacity: 0.01;
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
