<script>
import MainGame from "@/views/MainGame.vue";
import { ref as dbRef, set , onDisconnect} from 'firebase/database';
import { useDatabase, useDatabaseObject } from 'vuefire';
import Host from './Host.vue';

// export {roomCode}

export default {
  components: {
    MainGame,
    Host,
  },
  data() {
    // const db = useDatabase();
    // const roomCode = dbRef(db, 'roomCode');
    return {
      playerNum: 1,
      maxPlayers: 6,
      roomCode: "",
      //testFirebaseThinger: useDatabaseObject(testThinger),
    }; 
  },

  methods: {
    startGame() {
      const { playerNum, roomCode } = this;
      this.$router.push({ name: "MainGame", query: { playerNum, roomCode } });
    },
    submitCode() {
      const db = useDatabase();
      const roomCodeFB = dbRef(db, this.roomCode);
      set(roomCodeFB, {
        players: this.playerNum,
      });
      // roomCodeFB.onDisconnect().remove();
      
      // const { roomCode } = this.roomCode;
      // this.$router.push({ name: "MainGame", query: { roomCode } });
}
  },
};
</script>



<template>
  <div class="room">
    <!-- <h1>Room</h1> -->
    <!-- <div class="empty"></div> -->
    
    <Host />
    <div>
      <h2>Create room code: </h2>
      <input v-model="roomCode" @keydown.enter="submitCode()" />
      <br>
    <br>
    </div>
    
    <h2>Please select the number of players</h2>
    
    <div class="empty"></div>

    <p>{{ playerNum }}</p>

    <div class="empty"></div>

    <div class="selection-bar">
      <select v-model="playerNum">
        <option disabled value="">Select number of players</option>
        <option v-for="n in maxPlayers" :value="n">{{ n }}</option>
      </select>
    </div>

    <!-- <button @click="submitCode()" >
      Submit Room
    </button> -->

    <div class="response">{{}}</div>

    <!-- <select v-model="playerNum">
      <option disabled value="">Select number of players</option>
      <option v-for="n in maxPlayers" :value="n">{{ n }}</option>
    </select> -->


    <!-- <router-link to="/maingame" custom>
      <button @click="startGame()" role="link">START</button>
    </router-link> -->

    <!-- <router-link to="/" custom v-slot="{ navigate }">
      <button @click="navigate" role="link">BACK</button>
    </router-link> -->
    <div class="send-all">
      <div class="back-image">
        <router-link to="/" custom v-slot="{ navigate }">
          <img src="@/assets/back.svg" @click="navigate" role="link" />
        </router-link>
      </div>
      <div class="send-image">
        <router-link to="/maingame" custom>
          <img src="@/assets/back.svg" @click="startGame() , submitCode()" role="link" />
        </router-link>
      </div>
    </div>
  </div>
</template>

