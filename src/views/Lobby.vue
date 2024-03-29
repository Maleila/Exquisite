<!--Child component of Room.vue that facilitates adding player names
and viewing all players currently in the game. For local games, there
are no restrictions on player number, but for remote games the user will
only be able to add one name.-->

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
      this.playersRemote = playersData;
    });

    this.focusInput();
  },
  data() {
    return {
      playerNames: [],
      playersRemote: "",
      playerNum: 1,
      name: "",
      addOk: true, //for remote game
    };
  },
  methods: {
    addPlayer() {
      //prevent users from entering whitespace-only names or names that have already been used in this game
      if (this.name.trim() == "") {
        alert("Input your name");
      } else if (
        this.playerNames.includes(this.name.trim()) ||
        this.playersRemote.includes(this.name.trim())
      ) {
        alert("Choose another name!");
      } else {
        //for local game store players in a String array
        if (!this.remote) {
          this.playerNum++;
          if (this.playerNum == 2) {
            this.playerNames[0] = this.name;
          } else {
            this.playerNames[this.playerNum - 2] = this.name;
          }
          this.focusInput();
          //for remote game store players in Firebase
        } else {
          const db = useDatabase();
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
        // Need a try and catch block b/c you can only access the ref after the component is mounted
        try {
          if (!this.remote) {
            document.getElementById("localInput").focus();
          } else {
            document.getElementById("remoteInput").focus();
          }
        } catch (ex) {
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

    <li v-if="remote" v-for="item in playersRemote">
      {{ item }}
    </li>
  </div>
  <br />
  <div v-if="!host && remote && !addOk && playersRemote.length >= 2">
    Waiting for host to start game
    <br />
    <br />
  </div>
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
    <!--For local game, option to start the game as soon as there are at least two players-->
    <InkButtonStart
      v-if="!remote && playerNames.length >= 2"
      @click="$emit('setPlayers', playerNames)"
    />
  </div>
</template>

<style>
.prompt {
  font-size: 1.5em;
}

.players {
  font-size: 1.5em;
  text-align: left;
  width: 8em;
  margin: 0 auto;
}

li {
  list-style-position: inside;
  /* From: https://developer.mozilla.org/en-US/docs/Learn/CSS/Styling_text/Styling_lists */
}

.buttons {
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 1em;
  margin-left: 1em;
}

input {
  width: 15em;
  height: 1.5em;
  font-size: 1.2em;
  color: #484848;
  border-color: #484848;
  border-radius: 1em;
  border-width: 0.05em;
  text-indent: 0.8em;
  background-color: transparent;
}
</style>
