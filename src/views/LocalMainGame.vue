<script>
import { nextTick } from "vue";
import contenteditable from "vue-contenteditable";
import LocalViewStory from "@/views/LocalViewStory.vue";
import { useDatabase, useDatabaseObject } from "vuefire";
import { ref as dbRef, set, onDisconnect, onValue } from "firebase/database";

export default {
  components: {
    contenteditable,
    LocalViewStory,
  },
  mounted() {
    //called when a component is added (ex when the page loads)
    this.focusInput();
    console.log("players: " + this.playerNames);
    
    const db = useDatabase();
    const currentFB = dbRef(db, this.roomCode + "/gameAttributes/");

    onValue(currentFB, (snapshot) => {
      const data = snapshot.val();
      const currentPlayerFB = Object.values(data);
      this.currentPlayer = currentPlayerFB[0];
      //console.log(currentPlayerFB);
      console.log("current according to fb " + this.currentPlayer);
      console.log("this player: " + this.thisPlayer);
    });
  },
  data() {
    // const db = useDatabase();
    // const currentFB = dbRef(db, this.roomCode + "/gameAttributes/");

    // onValue(currentFB, (snapshot) => {
    //   const data = snapshot.val();
    //   const currentPlayerFB = Object.values(data);
    //   this.currentPlayer = currentPlayerFB[0];
    //   //console.log(currentPlayerFB);
    //   console.log("current according to fb " + this.currentPlayer);
    //   console.log("this player: " + this.thisPlayer);
    // });

    return {
      current: "",
      currentPlayer: "",
      count: 1,
      finished: false,
      story: "",
      previous: "",
      invis: false,
      mutable: true,
    };
  },
  methods: {
    passStory() {
      this.story = this.story.concat(this.previous);
      const { story } = this;
      this.$router.push({ name: "LocalViewStory", query: { story } });
    },
    reset() {
      this.current = "";
      this.count = 1;
      this.finished = false;
      this.story = "";
      this.previous = "";
      this.focusInput();
    },
    submitStory() {
      this.invis = true;
      this.mutable = false;
      setTimeout(() => this.transition(), 900);
    },
    transition() {
      if (this.remote) {
        const db = useDatabase();
        const messageFB = dbRef(
          db,
          this.roomCode + "/players/" + this.thisPlayer
        );
        set(messageFB, this.current);
        if (this.count <= this.playerNum) {
          const attributesFB = dbRef(
            db,
            this.roomCode + "/gameAttributes/current"
          );
          const next = parseInt(this.playerNames.indexOf(this.thisPlayer)) + 1;
          console.log("next index:" + next);
          console.log("next name: " + this.playerNames[next]);
          set(attributesFB, this.playerNames[next]);
        }
      }
      this.count++;
      this.story = this.story.concat(this.previous + " ");
      //remove transition for resetting opacity to 1, then re-add after the story is updated
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

      // var sample = document.getElementById("editable");
      // sample.style.color = "red";
      // sample.style.fontFamily = "Impact,Charcoal,sans-serif";
      // var random = Math.floor(Math.random() * 3);
      // if (random == 0) {
      //   sample.style.fontFamily = "Impact,Charcoal,sans-serif";
      // } else if (random == 1) {
      //   sample.style.fontFamily = "Lucida Console, Courier New, monospace";
      // } else {
      //   sample.style.fontFamily = "Arial, Helvetica, sans-serif";
      // }
      this.mutable = true;
      this.focusInput();
    },
    viewStory() {
      this.story = this.story.concat(this.previous);
      this.finished = true;
    },
    focusInput() {
      nextTick(() => {
        // Without the try and catch: Error message is: Uncaught (in promise) TypeError: Cannot read properties of undefined (reading 'focus')
        // Need a try and catch block b/c you can only access the ref after the component is mounted. So the first render this.$ref.storyInput is going to be null and raise a promise error. This try and catch block doesn't change the overall logic of this method and only serves as a way to reduce any errors on console. Reference: https://vuejs.org/guide/essentials/template-refs.html#accessing-the-refs
        try {
          //this.$refs.storyInput.focus(); //need this bc vue gets confused since the input field has a v-if
          document.getElementById("editable").focus();
        } catch (ex) {
          // Print out the error message, commented out to avoid clustering the console
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
    rounds: {
      type: Number,
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
    <h2 v-if="!finished && count <= playerNum">
      <div v-if="remote">roomCode={{ roomCode }}</div>
      <div v-if="!remote || thisPlayer == currentPlayer">Your turn!</div>
      <div v-if="!remote" class="title">
        Player {{ count }} of {{ playerNum }}: {{ playerNames[count - 1] }}
      </div>
      <div v-if="remote" class="title">
        Player {{ count }} of {{ playerNum }}: {{ currentPlayer }}
      </div>
      <div class="prompt">ENTER to submit</div>

      <br />
      <div class="story">
        <span class="invisible">
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
    </h2>

    <div class="view-story">
      <router-link to="/localviewstory" custom>
        <button
          v-if="count > playerNum && !finished"
          @click="passStory"
          role="link"
        >
          View Story
        </button>
      </router-link>
    </div>

    <!-- <button @click="viewStory" v-if="count > playerNum && !finished">
      View Story
    </button> -->

    <div class="story">
      <h3 v-if="finished && count > playerNum">{{ story }}</h3>
    </div>
    <br />
    <button @click="reset" v-if="finished && count > playerNum">
      Play Again
    </button>

    <router-link to="/" custom v-slot="{ navigate }">
      <button
        @click="navigate"
        role="link"
        v-if="finished && count > playerNum"
      >
        Back
      </button>
    </router-link>
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
  width: 80%;
  margin: 0 auto;
  text-align: left;
  font-family: Desyre;
  font-size: 2em;
}

.main-game .title {
  /* font-family: Desyre; */
  font-size: 2em;
  width: 80%;
  margin: 0 auto;
  font-weight: 200;
  text-align: left;
}

.main-game .prompt {
  color: #484848;
  font-size: 0.8em;
  width: 80%;
  margin: 0 auto;
  font-weight: 100;
  text-align: left;
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
