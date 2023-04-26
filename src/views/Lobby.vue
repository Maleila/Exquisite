<script>
import { ref as dbRef, set, onValue} from "firebase/database";
import { useDatabase } from "vuefire";

export default {
  mounted() {
    const db = useDatabase();
    const playersfb = dbRef(db, this.roomCode + "/players");

    //pulls all players in room from firebase
    onValue(playersfb, (snapshot) => {
      const data = snapshot.val();
      const playersData = Object.keys(data);
      this.players = playersData;
    });

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
        if (this.name == ""){
          alert("Input your name")
        } 
        else {
          this.playerNum++;
          if (this.playerNum == 2) {
          this.playerNames[0] = this.name;
        } else {
          this.playerNames[this.playerNum - 2] = this.name;
        }
        }
      } else {
        const db = useDatabase();
        if (this.name == ""){
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

  <input v-if="addOk && !remote" @keydown.enter="addPlayer" v-model="name" />
  <input v-if="addOk && remote" @keydown.enter="addPlayer(), $emit('setPlayers', playerNames)" v-model="name" />
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
</style>