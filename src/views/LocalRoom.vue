<script>
import Rounds from "@/views/Rounds.vue";
import Lobby from "@/views/Lobby.vue";
import JoinRoom from "@/views/JoinRoom.vue";
import { ref as dbRef, set , onDisconnect, onValue} from 'firebase/database';
import { useDatabase, useDatabaseObject } from 'vuefire';

export default {
  components: {
    Rounds,
    Lobby,
    JoinRoom,
  },
  mounted() {
    console.log("remote:" + this.remote);
    console.log("host: " + this.host);
  },
  data() {
    return {
      playerNum: 1,
      playerNames: [],
      rounds: 1,
      addPlayers: false,
      roundSelect: true,
      enterCode: true,
      roomCode: "",
    };
  },
  methods: {
    setRounds(rounds) {
      console.log("remote:" + this.remote);
      console.log("host: " + this.host);
      this.rounds = rounds;
      this.roundSelect = false;
      this.addPlayers = true;
      if(this.host) {
        this.randRoomCode();
      }
    },
    randRoomCode(){
      var row_password = Array(5).fill("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz").map(function(x) { return x[Math.floor(Math.random() * x.length)] }).join('');
      this.roomCode = row_password;

      const db = useDatabase();
        
      const roomCodeFB = dbRef(db, this.roomCode);
      set(roomCodeFB, {
        created: true,
      });
    },
    setPlayers(playerNames) {
      this.playerNames = playerNames;
      this.playerNum = this.playerNames.length;
      this.startGame();
    },
    enterRoomCode(roomCode) {
      this.roomCode = roomCode;
      this.enterCode = false;
      this.addPlayers = true;
    },
    startGame() {
      const { playerNum, playerNames, rounds } = this;
      this.$router.push({ name: "LocalGame", query: { playerNum, playerNames, rounds } });
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
    }
  },
};
</script>

<template>
  <div class="local-room">
    <div class="empty"></div> <!--what is this for??-->

    <JoinRoom v-if="remote && !host && enterCode" @enterRoomCode="enterRoomCode"/>
    
    <div v-if="remote && host || !remote" class="settings">
      <div class="title">Game Settings</div>
      <Rounds v-if="roundSelect" @setRounds="setRounds"/>
    </div> 

    <div v-if="addPlayers">
      Rounds: {{ rounds }}
      <div v-if="remote">Room Code: {{ roomCode }}</div>
      <Lobby :roomCode="roomCode" :remote="remote" :host="host" @setPlayers = "setPlayers"/>
    </div>

    <div class="send-all">
      <div class="back-image">
        <router-link to="/" custom v-slot="{ navigate }">
          <img src="@/assets/back.svg" @click="navigate" role="link" />
        </router-link>
      </div>
      <!--<div class="send-image">
        <router-link to="/localGame" custom>
          <img src="@/assets/back.svg" @click="startRoom" role="link" />
        </router-link>
      </div>-->
    </div>
  </div>
</template>

<style scoped></style>