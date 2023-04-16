<script>
import { ref as dbRef, set , onDisconnect, onValue} from 'firebase/database';
import { useDatabase, useDatabaseObject } from 'vuefire';

export default {
    mounted() {
        const db = useDatabase();
        const playersfb = dbRef(db, this.roomCode + "/players");

        onValue(playersfb, (snapshot) => {
            const data = snapshot.val();
            const playersData = Object.keys(data);
            this.players = playersData;
            console.log(this.players);
        })
    },
  data() {
    // const db = useDatabase();
    // const playersfb = dbRef(db, this.roomCode + "/players");

    // onValue(playersfb, (snapshot) => {
    //     const data = snapshot.val();
    //     const playersData = Object.keys(data);
    //     this.players = playersData;
    // })

    //const firebaseDB = dbRef(db, "/");

    return {
      playerNames: [],
      playerInfo: [0], //index 0 is index of THIS player in playerNames, index 1 is playerNames -- this array is used to pass both back to parent component
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
            this.playerInfo[1] = this.playerNames;
        } else {
            const db = useDatabase();
            const playersFB = dbRef(db, this.roomCode + "/players/" + this.name);
            set(playersFB, "");
            this.playerInfo[0] = this.players.indexOf(this.name);
            this.addOk = false;
        }
        this.name = "";
    },
    finalize() {
        if(this.remote) {
            this.playerInfo[1] = this.players;
        }
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
    <button @click="finalize(), $emit('setPlayers', playerInfo)">Start</button>
</template>

<style>

</style>