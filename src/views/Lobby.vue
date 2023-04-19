<script>
import { ref as dbRef, set, onDisconnect, onValue ,update} from "firebase/database";
import { useDatabase, useDatabaseObject } from "vuefire";

export default {
  mounted() {
    const db = useDatabase();
    const playersfb = dbRef(db, this.roomCode + "/players");

    onValue(playersfb, (snapshot) => {
      const data = snapshot.val();
      const playersData = Object.keys(data);
      this.players = playersData;
      console.log(this.players);
    });

    const playerNumfb = dbRef(db, this.roomCode + "/gameAttributes/count");

    onValue(playerNumfb, (snapshot) => {
      const data = snapshot.val();
      this.playerNum = data;
    });

  },
  data() {
    
    
    return {
      playerNames: [],
      players: "",
      playerNum: 1,
      name: "",
      addOk: true,
    };
  },
  methods: {
    addPlayer() {
      this.playerNum++;
      if (!this.remote) {
        if (this.playerNum == 1) {
          this.playerNames[0] = this.name;
        } else {
          this.playerNames[this.playerNum - 1] = this.name;
        }
      } else {
        console.log("adding player...")
        const db = useDatabase();
        const playersFB = dbRef(db, this.roomCode + "/players/" + this.name);
        set(playersFB, "");
        const playerNumFB = dbRef(db, this.roomCode + "/gameAttributes/count");
        set(playerNumFB, this.playerNum)
        this.playerNames[0] = this.name;
        this.addOk = false;
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

  <input v-model="name" />
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