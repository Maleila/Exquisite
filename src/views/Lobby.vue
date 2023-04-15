<script>
import { ref as dbRef, set , onDisconnect, onValue} from 'firebase/database';
import { useDatabase, useDatabaseObject } from 'vuefire';

export default {
  data() {
    const db = useDatabase();
    const playersfb = dbRef(db, this.roomCode + "/players");

    onValue(playersfb, (snapshot) => {
        const data = snapshot.val();
        const playersData = Object.keys(data);
        this.players = playersData;
    })

    const firebaseDB = dbRef(db, "/");

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
        if(!this.remote) {
            if(this.playerNum == 1) {
                this.playerNames[0] = this.name;
            } else {
                this.playerNames[this.playerNum-1] = this.name;
            }
            this.playerNum++;
        } else {
            const db = useDatabase();
            const playersFB = dbRef(db, this.roomCode + "/players/" + this.name);
            set(playersFB, "");
            this.addOk = false;
            this.playerNames = this.players;
        }
        this.name = "";
    }
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
    }
  },
}
</script>

<template>
    <div>
    Players:
    </div>
    <li v-if="!remote" v-for="item in playerNames">
        {{ item }}
    </li>

    <li v-if="remote" v-for="item in players">
        {{ item }}
    </li>

    <input v-model="name">
    <br>
    <button v-if= "addOk" @click="addPlayer">Add</button>
    <br>
    <button @click="$emit('setPlayers', playerNames)">Start</button>
</template>

<style>

</style>