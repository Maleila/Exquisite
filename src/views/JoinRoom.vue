<script>
import { ref as dbRef, onValue} from 'firebase/database';
import { useDatabase} from 'vuefire';

export default {
  mounted() {
    const db = useDatabase();
    const firebaseDB = dbRef(db, "/");

    //pulls existing roomcodes from firebase
    onValue(firebaseDB, (snapshot) => {
        const data = snapshot.val();
        const roomCodeData = Object.keys(data);
        this.roomCodes = roomCodeData;
    });

  },
  data() {
    return {
      playerName: "",
      roomCode: "",
      submit: false,
      roomCodes: "",
      started: false,
    }
  },
  methods: {
    submitPlayer() {
      const db = useDatabase();
      const startedFB = dbRef(db, this.roomCode + "/gameAttributes");
      
      // Check if the game has already started
      onValue(startedFB, (snapshot) => {
        const data = snapshot.val();
        const start = Object.values(data);
        this.started = start[0];
      });

      //checks for valid roomCode
        if (this.roomCode == ""){
            alert("Input room code");
        }
        else if (!(this.roomCodes).includes(this.roomCode)) {
            alert("Invalid room code");
        } else if (this.started) {
          alert("Game already started");
        } else {
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