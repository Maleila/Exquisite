<script>
import Rounds from "@/views/Rounds.vue";
import Lobby from "@/views/Lobby.vue";
import JoinRoom from "@/views/JoinRoom.vue";
import { ref as dbRef, set, onDisconnect, onValue } from "firebase/database";
import { useDatabase, useDatabaseObject } from "vuefire";

export default {
  components: {
    Rounds,
    Lobby,
    JoinRoom,
  },
  mounted() {
    // console.log("remote: " + this.remote);
    // console.log("host: " + this.host);
  },
  data() {
    return {
      playerNum: 1,
      playerNames: [],
      thisPlayer: "",
      rounds: 1,
      addPlayers: false,
      roundSelect: true,
      enterCode: true,
      roomCode: "",
    };
  },
  methods: {
    setRounds(rounds) {
      // console.log("remote:" + this.remote);
      // console.log("host: " + this.host);
      this.rounds = rounds;
      this.roundSelect = false;
      this.addPlayers = true;
      if (this.host) {
        this.randRoomCode();
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

      const db = useDatabase();

      const roomCodeFB = dbRef(db, this.roomCode);
      set(roomCodeFB, {
        created: true,
      });
    },
    setPlayers(playerInfo) {
      this.playerNames = playerInfo[1];
      console.log("player names: " + this.playerNames);
      this.thisPlayer = this.playerNames[playerInfo[0]];
      console.log(this.thisPlayer);
      this.playerNum = this.playerNames.length;
      this.startGame();
    },
    enterRoomCode(roomCode) {
      this.roomCode = roomCode;
      this.enterCode = false;
      this.addPlayers = true;
    },
    startGame() {
      if (this.remote) {
        const db = useDatabase();

        const attributesFB = dbRef(db, this.roomCode + "/gameAttributes/");
        set(attributesFB, {
          current: this.playerNames[0],
        });
      }
      const {
        playerNum,
        playerNames,
        rounds,
        remote,
        host,
        roomCode,
        thisPlayer,
      } = this;
      this.$router.push({
        name: "LocalGame",
        query: {
          playerNum,
          playerNames,
          rounds,
          remote,
          host,
          roomCode,
          thisPlayer,
        },
      });
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
    },
  },
};
</script>

<template>
  <div class="local-room">
    <div class="empty"></div>
    <!--what is this for??-->

    <JoinRoom
      v-if="remote && !host && enterCode"
      @enterRoomCode="enterRoomCode"
    />

    <div v-if="(remote && host) || !remote" class="settings">
      <div class="title">Game Settings</div>
      <Rounds v-if="roundSelect" @setRounds="setRounds" />
    </div>

    <div v-if="addPlayers">
      Rounds: {{ rounds }}
      <div v-if="remote">Room Code: {{ roomCode }}</div>
      <Lobby
        :roomCode="roomCode"
        :remote="remote"
        :host="host"
        @setPlayers="setPlayers"
      />
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

<style scoped>
.local-room h1 {
  color: #434343;

  font-size: 4em;
  font-weight: 900;
  line-height: 0.4em;
}

.local-room .title {
  font-size: 3em;
  width: 80%;
  margin: 0 auto;
  font-weight: 200;
  text-align: center;
}

.local-room .prompt {
  color: #484848;
  font-size: 1.2em;
  width: 80%;
  margin: 0 auto;
  font-weight: 100;
  text-align: center;
}

.local-room .selection-bar {
  color: #484848;
  font-size: 1.2em;
  width: 80%;
  margin: 0 auto;
  font-weight: 100;
  text-align: center;
}

.local-room .number {
  color: #434343;
  /* font-family: "CalorieRegular"; */
  font-family: Desyre;
  font-size: 15em;
  font-weight: 900;
  /* line-height: 0.4em; */
}

.local-room .empty {
  height: 10vh;
}

.local-room .send-all {
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 1rem;
  align-items: center;
}

.local-room .back-image img {
  width: 30px;
  height: auto;
}

.local-room .send-image img {
  width: 30px;
  height: auto;
  transform: rotate(180deg);
}

.local-room .button {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
}

.local-room button {
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

.local-room button:hover {
  text-decoration: underline;
}
</style>
