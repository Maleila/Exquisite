<script>
import { ref as dbRef, set, getDatabase , onValue} from "firebase/database";
import { useDatabase, useDatabaseObject } from "vuefire";

export default {
        
    data() {
        const db = useDatabase();
        const hostfb = dbRef(db, this.roomCode + "/host");
        // onValue(host, (snapshot) => {
        //     const data = snapshot.val();
        // });
        //const playerfb = dbRef(db, this.roomCode + "/player");
        return {
            host : useDatabaseObject(hostfb),
            //player : useDatabaseObject(playerfb)
        }
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
}
</script>


<template>
    Room Code: {{roomCode}}
  <div id="LoadingPlayers">
      
    <h2>Host</h2>
    {{host.$value}}
    <br>
    <h2>Players</h2>
    <!-- <div v-if="player.$value != undefined"> {{player.$value}} </div> -->
    <br>
    <router-link to="/maingame" custom>
        <button @click="navigate ,startGame" role="link">Start game</button>
    </router-link>

  </div>
</template>

<style scoped>

</style>