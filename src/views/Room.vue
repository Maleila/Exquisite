<script>
import MainGame from "@/views/MainGame.vue";
import { ref as dbRef, set, onDisconnect } from "firebase/database";
import { useDatabase, useDatabaseObject } from "vuefire";
import { getAuth } from "firebase/auth";

//import JoinRoom from './JoinRoom.vue';

// export {roomCode}

export default {
  components: {
    MainGame,
    //JoinRoom,
  },
  data() {
    // const db = useDatabase();
    // const roomCode = dbRef(db, 'roomCode');
    return {
      playerNum: 1,
      maxPlayers: 6,
      roomCode: "",
      hostName: "",
      submit: false,
      //testFirebaseThinger: useDatabaseObject(testThinger),
    };
  },

  methods: {
    startRoom() {
      if (this.hostName == "") {
        alert("Add your name");
      } else if (this.roomCode == "") {
        alert("Create room code");
      } else {
        const { roomCode } = this;
        this.$router.push({ name: "LoadingPage", query: { roomCode } });
        const db = useDatabase();

        const roomCodeFB = dbRef(db, this.roomCode);
        set(roomCodeFB, {
          created: true,
        });

        // const auth = getAuth();
        // const user = auth.currentUser;
        // const uid = user.uid;

        const playersFB = dbRef(
          db,
          this.roomCode + "/players/" + this.hostName
        );
        set(playersFB, "");

        // const hostFB = dbRef(db, this.roomCode + "/" + this.hostName);
        // set(hostFB, "");
        // roomCodeFB.onDisconnect().remove();
      }
    },
    randRoomCode() {
      var row_password = Array(5)
        .fill("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz")
        .map(function (x) {
          return x[Math.floor(Math.random() * x.length)];
        })
        .join("");
      this.roomCode = row_password;
    },
    submitCode() {
      const { playerNum, roomCode } = this;
      if (this.hostName == "") {
        alert("Add your name");
      } else if (this.roomCode == "") {
        alert("Create room code");
      } else {
        this.submit = true;
      }
      // const db = useDatabase();

      // const roomCodeFB = dbRef(db, this.roomCode);
      // set(roomCodeFB, {
      //   host: this.hostName,
      // roomCodeFB.onDisconnect().remove();

      // const { roomCode } = this.roomCode;
      // this.$router.push({ name: "MainGame", query: { roomCode } });
    },
  },
};
</script>

<template>
  <div class="room">
    <!-- <h1>Room</h1> -->
    <!-- <div class="empty"></div> -->

    <div id="enterName">
      <h2>Name</h2>
      <input v-model="hostName" />
      <br />
    </div>
    <!-- <JoinRoom /> -->
    <div>
      <h2>Generate room code:</h2>
      <button @click="randRoomCode">Generate</button>
      <br />
      {{ roomCode }}
      <br />
      <br />
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
      <button v-if="submit == false" @click="submitCode">Submit</button>
      <div v-if="submit">
        {{ hostName }}, room has been created: {{ roomCode }}
        <router-link to="/loadingpage" custom v-slot="{ navigate }">
          <button @click="startRoom" role="link">Loading Players</button>
        </router-link>
      </div>
      <!-- <div class="send-image">
        <router-link to="/loadingpage" custom v-slot="{ navigate }">
          <button @click="startRoom() , navigate" role="link">Loading Players</button>
        </router-link>
      </div> -->
    </div>
  </div>
</template>

<style scoped>
/* .error {
  border-style: solid;
  border-width: 2px;
  border-color: red;
  background:pink;
} */

.room h1 {
  color: #434343;

  font-size: 4em;
  font-weight: 900;
  line-height: 0.4em;
}

.room h2 {
  color: #434343;
  font-size: 2em;
  font-weight: 200;
  line-height: 0.4em;
}

.room p {
  color: #434343;
  font-size: 4em;
  font-weight: 900;
  line-height: 0.4em;
}

.room .send-all {
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 1rem;
  align-items: center;
}

/* .room .back-image {
  position: absolute;
  top: 0;
  left: 0;
  padding: 10px;
} */

.room .back-image img {
  width: 30px;
  height: auto;
}

/* .room .send-image {
  position: absolute;
  top: 0;
  left: 0;
  padding: 10px;
} */

.room .send-image img {
  width: 30px;
  height: auto;
  transform: rotate(180deg);
}

.room .empty {
  height: 2em;
}

.room .button {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
}

.room button {
  color: #434343;
  font-family: inherit;
  font-size: 1.5rem;
  font-weight: 100;
  margin-bottom: 2.2rem;
  border: none;
  background: none;
  letter-spacing: 0.1em;
  transition: 0.3s;
}

.room button:hover {
  text-decoration: underline;
}
</style>
