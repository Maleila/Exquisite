<script>
import { nextTick } from "vue";
import contenteditable from "vue-contenteditable";
import InkButtonView from "@/views/buttons/InkButtonView.vue";
import InkButtonHome from "@/views/buttons/InkButtonHome.vue";
import InkButtonAgain from "@/views/buttons/InkButtonAgain.vue";
import { useDatabase } from "vuefire";
import { ref as dbRef, set, onValue } from "firebase/database";

export default {
  components: {
    contenteditable,
    InkButtonView,
    InkButtonHome,
    InkButtonAgain,
  },
  //called when a component is added (ex when the page loads)
  mounted() {
    this.focusInput();

    //code from this website: https://fontawesomeicons.com/fa/vue-js-on-tab-close-event
    window.addEventListener("beforeunload", this.handleBeforeUnload);

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
  //code from this website: https://fontawesomeicons.com/fa/vue-js-on-tab-close-event
  beforeUnmount() {
    window.removeEventListener("beforeunload", this.handleBeforeUnload);
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
      mutable: true, // Is the story editable by the current player?
      showButton: false,
      zcount: 0,
      sentenceArray: [],
      turnMessage: "",
      promptMessage: "",
      authors: "",
      isTabClosed: false,
    };
  },
  methods: {
    // Ensure user cannot lose the ability to type by
    // clicking outside of the edit area while typing
    onFocusLost() {
      // The browser will move the selection to the clicked location _after_ sending
      // us the blur event. Wait until it's done stealing focus from us, _then_
      // steal it back!
      setTimeout(() => {
        if (this.mutable) {
          const editable = document.getElementById("editable");
          window.getSelection().selectAllChildren(editable);
          window.getSelection().collapseToEnd();
        }
      }, 0);
    },
    //code from this website: https://fontawesomeicons.com/fa/vue-js-on-tab-close-event
    handleBeforeUnload(event) {
      // This method will be called when the user leaves the page or closes the tab
      this.isTabClosed = true;

      // Optionally, you can show a confirmation dialog to the user
      event.preventDefault();
      event.returnValue = ""; //have to return something or firefox will be angry
    },
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
      } else if (this.zcount > this.playerIndex + 1) {
        //+1 so it doesn't grab the user's own sentence
        const recent = this.zcount - 1;

        this.following = this.following.concat(
          this.sentenceArray[recent] + " "
        );
      }
      if (this.zcount == this.playerIndex) {
        this.turnMessage = "Your turn, " + this.thisPlayer + "!";
        if (this.zcount == 0) {
          this.promptMessage = "Start the most interesting story";
        } else if (this.zcount == this.playerNum - 1) {
          this.promptMessage = "Finish this great story";
        } else {
          this.promptMessage = "Continue this fun story";
        }
        this.mutable = true;
        this.focusInput();
      } else if (this.zcount < this.playerNum) {
        this.turnMessage = "Waiting...";
        this.promptMessage =
          "Hi " +
          this.thisPlayer +
          ", " +
          this.currentPlayer +
          " (" +
          (this.zcount + 1) +
          "/" +
          this.playerNum +
          ") is typing...";
      } else if (this.zcount == this.playerNum) {
        //maybe I want to wait on this until u click the button?
        this.turnMessage = "Exquisite Corpse";
        this.promptMessage = "By " + this.authors;
        setTimeout(() => this.finalTransition(), 910); //needs to wait the 900 ms for the last player's sentence to update
      }
    },
    //sets this.authors to String of playerNames with commas and "and"
    formatAuthors() {
      let formatted = "";
      for (let i = 0; i < this.playerNames.length - 1; i++) {
        formatted = formatted.concat(this.playerNames[i] + ", ");
      }
      formatted = formatted.concat(
        "and " + this.playerNames[this.playerNames.length - 1]
      );
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
      this.showButton = false;
      this.invis = false;
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
    finalTransition() {
      console.log("previous: " + this.previous);
      this.invis = true;
      setTimeout(() => {
        this.story = this.story.concat(this.previous + " ");
        this.previous = "";
        this.showButton = true;
      }, 900);
    },
    //puts together story
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
  //code from this website: https://fontawesomeicons.com/fa/vue-js-on-tab-close-event
  watch: {
    isTabClosed(newValue) {
      // This watch will be triggered when the isTabClosed data property changes
      if (newValue) {
        // Add your code here to handle the beforeunload event
        console.log("User left the page or closed the tab");
      }
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
      <div class="title-box">
        <div class="roomcode" v-if="remote">RoomCode: {{ roomCode }}</div>
        <div class="title" v-if="remote">{{ turnMessage }}</div>
        <div class="title" v-if="!remote && count <= playerNum">
          Player {{ count }} of {{ playerNum }}: {{ playerNames[count - 1] }}
        </div>
        <div v-if="!remote && count > playerNum" class="title">
          Exquisite Corpse
        </div>
        <div class="prompt" v-if="!remote && count > playerNum">
          By {{ authors }}
        </div>
        <div class="prompt" v-if="remote">{{ promptMessage }}</div>
      </div>

      <div v-if="true">
        <!--should definitely get rid of this-->
        <br />
        <div v-if="remote"><br /></div>
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
            @blur="onFocusLost"
          >
          </contenteditable>
          <div
            class="enterPrompt"
            v-if="remote && this.playerIndex == this.zcount"
          >
            ENTER to submit
          </div>
          <div class="enterPrompt" v-if="!remote && count <= playerNum">
            ENTER to submit
          </div>
          <img
            class="pencilGif"
            v-if="
              remote &&
              this.playerIndex != this.zcount &&
              this.zcount < this.playerNum
            "
            src="src/assets/pencil.gif"
            alt="drawing pencil"
          />
          <span v-if="!finished" class="invisible" id="after">
            {{ following }}
          </span>
        </div>
      </div>
    </h2>

    <div v-if="!finished" class="view-story">
      <InkButtonView v-if="showButton" @click="viewStory" />
    </div>

    <div class="buttons">
      <InkButtonAgain @click="reset" v-if="finished && !remote" />
      <InkButtonHome v-if="finished" />
    </div>
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
  display: inline;
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

.main-game .title-box {
  position: fixed;
  top: 2em;
  left: 3.5em;
  padding: 0.2em 0.5em;
  border-radius: 0.2em;
  background: rgba(224, 224, 224, 0.8);
  z-index: 1;
}

.main-game .title-box .title {
  color: #282828;
  font-size: 2em;
  font-weight: 200;
  text-align: left;
}

.main-game .title-box .prompt {
  color: #484848;
  font-size: 0.8em;
  font-weight: 100;
  text-align: left;
}

.main-game .title-box .roomcode {
  color: #484848;
  font-size: 0.8em;
  font-weight: 100;
  text-align: left;
}

.main-game .enterPrompt {
  color: #484848;
  font-family: Avenir, Papyrus, system-ui, Helvetica, Arial, sans-serif;
  font-size: 0.5em;
  font-weight: 100;
  position: fixed;
  bottom: 3em;
  left: 3.5em;
  padding: 0.2em 0.5em;
  border-radius: 0.2em;
  background: rgba(224, 224, 224, 0.95);
  z-index: 1;
}

.main-game .pencilGif {
  position: fixed;
  width: 35%;
  right: 32%;
  top: 40%;
}

.main-game .view-story {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 0vh;
  position: fixed;
  width: 20%;
  right: 40%;
  top: 50%;
  z-index: 1;
}

.main-game .pencilGif img {
  max-width: 100%;
  max-height: 100%;
}
</style>
