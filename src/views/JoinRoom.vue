<script>
import { ref as dbRef, set , onDisconnect} from 'firebase/database';
import { useDatabase, useDatabaseObject } from 'vuefire';
import { getAuth } from "firebase/auth";

export default {
  data() {
    return {
      playerName: "",
      roomCode: "",
      submit: false,
    }
  },
  methods: {
    submitPlayer() {
    const { playerName, roomCode } = this;
    this.$router.push({ name: "LoadingPage", query: { roomCode } });
    const db = useDatabase();

    // const auth = getAuth();
    // const user = auth.currentUser;
    // const uid = user.uid;

    const playersFB = dbRef(db, this.roomCode + "/players/" + this.playerName);
      set(playersFB, "");


    },
    enterRoom(){
        if (this.roomCode == ""){
            alert("Input room code");
        }
        else if (this.playerName == ""){
            alert("Add your name");
        } else {
            // const db = useDatabase();
            // const roomFB = dbRef(db, this.roomCode + "/created");
            // const roomDB = useDatabaseObject(roomFB);
            // //const hostFB = dbRef(db, this.roomCode + "/host");
            // console.log("room:" + roomDB)
            // if (roomFB.$value == undefined){
            //     alert("Invalid room")
            // } else {
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
    <input v-model="roomCode">
    <h2>Name</h2>
    <input v-model="playerName">
    <br>
    <button @click="enterRoom">
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