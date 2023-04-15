<script>
import { ref as dbRef, set, getDatabase, onValue, DataSnapshot, update } from "firebase/database";
import { useDatabase, useDatabaseObject } from "vuefire";

export default {
  data() {
    
    // onValue(playersfb, (snapshot) => {
    //     const data = snapshot.val();
    // });
    //DataSnapshot playerSnapshot = dataSnapshot.child("players")
    // onValue(host, (snapshot) => {
    //     const data = snapshot.val();
    // });
    //const playerfb = dbRef(db, this.roomCode + "/player");
    const db = useDatabase();
    const playersfb = dbRef(db, this.roomCode + "/players");


    onValue(playersfb, (snapshot) => {
        const data = snapshot.val();
        const playersData = Object.keys(data);
        this.players = playersData;
    })
    // console.log("outside onValue");


    return {
        players: ""
      //player : useDatabaseObject(playerfb)
    };
  },
  methods: {
    startGame() {
      this.$router.push({ name: "MainGame", query: { roomCode } });
    },
  },
  props: {
    roomCode: {
      type: String,
      required: true,
    },
  },
};
</script>

<template>
  Room Code: {{ roomCode }}
  <div id="LoadingPlayers">
    <h2>Players</h2>
    {{players}}
    <!-- <div v-if="player.$value != undefined"> {{player.$value}} </div> -->
    <br />
    <router-link to="/maingame" custom>
      <button @click="navigate, startGame" role="link">Start game</button>
    </router-link>
  </div>
</template>

<style scoped></style>
