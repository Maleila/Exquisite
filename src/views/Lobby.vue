<script>
import { ref as dbRef, set, onValue} from "firebase/database";
import { useDatabase } from "vuefire";
import { nextTick } from "vue";

export default {
  emits: ['setPlayers'],
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
        if (this.name.trim() == ""){
          alert("Input your name");
        } 
        else {
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
        if (this.name.trim() == ""){
          alert("Input your name")
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
          if(!this.remote) {
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
  <div class="prompt">Players:</div>
  <li v-if="!remote" v-for="item in playerNames">
    {{ item }}
  </li>

  <li v-if="remote" v-for="item in players">
    {{ item }}
  </li>

  <input id="localInput" v-if="addOk && !remote" @keydown.enter="addPlayer" v-model="name" />
  <input id="remoteInput" v-if="addOk && remote" @keydown.enter="addPlayer(), $emit('setPlayers', playerNames)" v-model="name" />
  <br />
  <!--If local game, Add button only adds player-->
  <button v-if="addOk && !remote" @click="addPlayer">Add</button>
  <!--If remote game, Add button adds player and sends player info back to parent component-->
  <button v-if="addOk && remote" @click="addPlayer(), $emit('setPlayers', playerNames)">AddRemote</button>
  <br />
  <button v-if="!remote" @click="$emit('setPlayers', playerNames)">Start</button>
</template>

<style>
.prompt {
  font-size: 2vh;
}

li {
  list-style-position: inside;
  /* probably don't need to cite this but it's from here: https://developer.mozilla.org/en-US/docs/Learn/CSS/Styling_text/Styling_lists */
}
</style>