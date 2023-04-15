<script>
import { ref as dbRef, set , onDisconnect, onValue} from 'firebase/database';
import { useDatabase, useDatabaseObject } from 'vuefire';
import { getAuth } from "firebase/auth";

export default {
  data() {
    const db = useDatabase();
    const firebaseDB = dbRef(db, "/");


    onValue(firebaseDB, (snapshot) => {
        const data = snapshot.val();
        const roomCodeData = Object.keys(data);
        this.roomCodes = roomCodeData;
    })

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
        else if (this.playerName == ""){
            alert("Add your name");
        } else if (!(this.roomCodes).includes(this.roomCode)) {
            alert("Invalid room code");
        }
        else {
            const { playerName, roomCode } = this;
            this.$router.push({ name: "LoadingPage", query: { roomCode } });
            const db = useDatabase();

            // const auth = getAuth();
            // const user = auth.currentUser;
            // const uid = user.uid;

            const playersFB = dbRef(db, this.roomCode + "/players/" + this.playerName);
            set(playersFB, "");
        }
    },
    enterRoom(){
        if (this.roomCode == ""){
            alert("Input room code");
        }
        else if (this.playerName == ""){
            alert("Add your name");
        } else if (!(this.roomCodes).includes(this.roomCode)) {
            alert("Invalid room code");
        }
        else {
            this.submit = true;
        }
    }
  }
}
</script>


<template>
  <div id="enterRoom">
    <h2>Room Code</h2>
    {{roomCode}}
    <br>
    <input v-model="roomCode">
    <h2>Name</h2>
    <input v-model="playerName">
    <br>
    <button v-if="!submit" @click="enterRoom">
      Go
    </button>
    <div v-if="submit">
    {{playerName}} has joined {{ roomCode }}
    <router-link to="/loadingpage" custom v-slot="{ navigate }">
        <button @click="submitPlayer" role="link">Loading Players</button>
    </router-link>
    </div>
    

    
  </div>
</template>

<style scoped>

</style>