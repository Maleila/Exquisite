<script>
import { ref as dbRef, set } from "firebase/database";
import { useDatabase, useDatabaseObject } from "vuefire";

export default {
  data() {
    const db = useDatabase();
    return {
      playerName: "",
      roomCodeJoin: "",
    }
  },
  methods: {
    joinLobby() {
      const db = useDatabase();
      const roomCodeFB = dbRef(db, this.roomCodeJoin);
      set(roomCodeFB , {player: this.playerName});
      
      const { playerName, roomCodeJoin } = this;
      this.$router.push({ name: "Lobby", query: { playerName, roomCodeJoin } });
    }
  }
}
</script>


<template>
  <div id="enterRoom">
    <h2>Room Code</h2>
    <input v-model="roomCodeJoin">
    <h2>Name</h2>
    <input v-model="playerName">
    <br>
    <button @click="joinLobby">
      Go
    </button>    
  </div>
</template>

<style scoped>
/* h2 {
   font: ; 
} */
</style>