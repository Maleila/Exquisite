<script>
import { ref as dbRef, set, onValue } from "firebase/database";
import InkButtonAdd from "@/views/buttons/InkButtonAdd.vue";
import InkButtonStart from "@/views/buttons/InkButtonStart.vue";
import { useDatabase } from "vuefire";
import { nextTick } from "vue";

export default {
  emits: ["setPlayers"],
  components: {
    InkButtonAdd,
    InkButtonStart,
  },
  mounted() {
    const db = useDatabase();
    const playersfb = dbRef(db, this.roomCode + "/players");

    //pulls all players in room from firebase
    onValue(playersfb, (snapshot) => {
      const data = snapshot.val();
      const playersData = Object.keys(data);
      this.players = playersData;
    });

    this.focusInput();
  },
  data() {
    return {
      playerNames: [],
      players: "",
      playerNum: 1,
      name: "",
      addOk: true, //for remote game
    };
  },
  methods: {
    addPlayer() {
      if (!this.remote) {
        if (this.name.trim() == "") {
          alert("Input your name");
        } else if (this.playerNames.includes(this.name.trim())) {
          alert("Choose another name!");
        } else {
          this.playerNum++;
          if (this.playerNum == 2) {
            this.playerNames[0] = this.name;
          } else {
            this.playerNames[this.playerNum - 2] = this.name;
          }
          this.focusInput();
        }
      } else {
        const db = useDatabase();
        if (this.name.trim() == "") {
          alert("Input your name");
        } else if (this.players.includes(this.name.trim())) {
          alert("Choose another name!");
        } else {
          this.playerNum++;
          const playersFB = dbRef(db, this.roomCode + "/players/" + this.name);
          set(playersFB, "");
          this.playerNames[0] = this.name;
          this.addOk = false;
        }
      }
      this.name = "";
    },
    focusInput() {
      nextTick(() => {
        // Without the try and catch: Error message is: Uncaught (in promise) TypeError: Cannot read properties of undefined (reading 'focus')
        // Need a try and catch block b/c you can only access the ref after the component is mounted. So the first render this.$ref.storyInput is going to be null and raise a promise error. This try and catch block doesn't change the overall logic of this method and only serves as a way to reduce any errors on console. Reference: https://vuejs.org/guide/essentials/template-refs.html#accessing-the-refs
        try {
          if (!this.remote) {
            document.getElementById("localInput").focus();
          } else {
            document.getElementById("remoteInput").focus();
          }
        } catch (ex) {
          // Print out the error message
          console.log("Error detected: " + ex);
        }
      });
    },
  },
  props: {
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
  },
};
</script>

<template>
  <br />
  <div class="prompt">Players</div>
  <div class="players">
    <br />
    <li v-if="!remote" v-for="item in playerNames">
      {{ item }}
    </li>

    <li v-if="remote" v-for="item in players">
      {{ item }}
    </li>
  </div>
  <br />
  <input
    id="localInput"
    v-if="addOk && !remote"
    @keydown.enter="addPlayer"
    v-model="name"
    maxlength="14"
  />
  <input
    id="remoteInput"
    v-if="addOk && remote"
    @keydown.enter="addPlayer(), $emit('setPlayers', playerNames)"
    v-model="name"
  />
  <br />
  <br />
  <div class="buttons">
    <!--If local game, Add button only adds player-->
    <InkButtonAdd v-if="addOk && !remote" @click="addPlayer" />
    <!--If remote game, Add button adds player and sends player info back to parent component-->
    <InkButtonAdd
      v-if="addOk && remote"
      @click="addPlayer(), $emit('setPlayers', playerNames)"
    />
    <InkButtonStart
      v-if="!remote && playerNames.length >= 2"
      @click="$emit('setPlayers', playerNames)"
    />
  </div>
</template>

<style>
.prompt {
  font-size: 3vh;
}

.players {
  font-size: 3vh;
  text-align: left;
  width: 30vh;
  margin: 0 auto;
}

li {
  list-style-position: inside;
  /* probably don't need to cite this but it's from here: https://developer.mozilla.org/en-US/docs/Learn/CSS/Styling_text/Styling_lists */
}

.buttons {
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 3vh;
  margin-left: 3vh;
}

input {
  width: 36vh;
  height: 4vh;
  font-size: 2.5vh;
  color: #484848;
  border-color: #484848;
  border-radius: 1em;
  border-width: 0.2vh;
  text-indent: 2vh;
  background-color: transparent;
}
</style>
