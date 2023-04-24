<script>
import { ref as dbRef, set , onDisconnect, onValue} from 'firebase/database';
import { useDatabase, useDatabaseObject } from 'vuefire';

export default {
  mounted() {
    const db = useDatabase();
    const firebaseDB = dbRef(db, "/");

    onValue(firebaseDB, (snapshot) => {
        const data = snapshot.val();
        const roomCodeData = Object.keys(data);
        this.roomCodes = roomCodeData;
    })

  },
  data() {
    return {
      playerName: "",
      roomCode: "",
      submit: false,
      roomCodes: "",
    }
  },
  methods: {
    submitPlayer() {
        if (this.roomCode == ""){
            alert("Input room code");
        }
        else if (!(this.roomCodes).includes(this.roomCode)) {
            alert("Invalid room code");
        } 
        else {
         this.$emit('enterRoomCode', this.roomCode);
        }
    },
  }
}
</script>


<template>
  <div id="enterRoom">
    <h2>Room Code</h2>
    {{roomCode}}
    <br>
    <input @keydown.enter="submitPlayer" v-model="roomCode">
    <button @click="submitPlayer">Enter Room</button>
  </div>
</template>

<style scoped>

</style>