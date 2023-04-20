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
  },
  data() {
    return {
      playerNum: 1,
      playerNames: [],
      playersFB: [],
      thisPlayer: "",
      rounds: 1,
      addPlayers: false,
      roundSelect: true,
      enterCode: true,
      started: false,
      roomCode: "",
    };
  },
  methods: {
    setRounds(rounds) {
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

      const attributesFB = dbRef(db, this.roomCode + "/gameAttributes/current");
      set(attributesFB, "");

      const startedFB = dbRef(db, this.roomCode + "/gameAttributes/started");
      set(startedFB, false);
    },
    setPlayers(playerNames) {
      const db = useDatabase(); //only for remote - add if
      const playersfb = dbRef(db, this.roomCode + "/players");

      onValue(playersfb, (snapshot) => {
        const data = snapshot.val();
        const playersData = Object.keys(data);
        this.playersFB = playersData;
      });

      this.thisPlayer = playerNames[0];
      console.log("this player: " + this.thisPlayer);
      if(!this.remote) {
        this.playerNames = playerNames;
      } else {
        this.playerNames = this.playersFB;
      }
      console.log("player names: " + this.playerNames);
      this.playerNum = this.playerNames.length;
      if(!this.remote) {
        this.startGame();
      }
    },
    enterRoomCode(roomCode) {
      this.roomCode = roomCode;
      this.enterCode = false;
      this.addPlayers = true;

      const db = useDatabase();
      const startedFB = dbRef(db, this.roomCode + "/gameAttributes");
      
      onValue(startedFB, (snapshot) => {
        const data = snapshot.val();
        const start = Object.values(data);
        this.started = start[1];
        if(this.started == true) {
          this.finalizePlayers();
          this.onStart();
        }
      });
    },
    finalizePlayers() {
      this.playerNames = this.playersFB;
      this.playerNum = this.playerNames.length;
      console.log("final players: " + this.playerNames)
    },
    startGame() { //if you're the host or playing locally
      if (this.remote) {
        const db = useDatabase();
        this.finalizePlayers();
        if (this.playerNum >= 2){

          const attributesFB = dbRef(db, this.roomCode + "/gameAttributes/current");
          set(attributesFB, this.playerNames[0]);

          const startedFB = dbRef(db, this.roomCode + "/gameAttributes/started");
          set(startedFB, true);
          this.onStart();
          } else {
            alert("Wait for more players")
            }
      }
      else {
        if (this.playerNum >= 2){
        this.onStart();
        } else {
          alert("Add more players")
        }
      }
    },
    onStart(){
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

    <JoinRoom
      v-if="remote && !host && enterCode"
      @enterRoomCode="enterRoomCode"
    />

    <div v-if="(remote && host) || !remote" class="settings">
      <div class="title">Game Settings</div>

      <Rounds v-if="roundSelect" @setRounds="setRounds" />
    </div>

    <div v-if="addPlayers">
      <div class="prompt">Rounds: {{ rounds }}</div>
      <div v-if="remote">Room Code: {{ roomCode }}</div>
      <Lobby
        :roomCode="roomCode"
        :remote="remote"
        :host="host"
        @setPlayers="setPlayers"
      />
    </div>
    <button v-if="host" @click="startGame()">Start</button>

    <div class="back">
      <router-link to="/" custom v-slot="{ navigate }">
        <button @click="navigate" role="link">Back</button>
      </router-link>
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
  font-size: 6vh;
  width: 80%;
  margin: 0 auto;
  font-weight: 200;
  text-align: center;
}

.local-room .empty {
  height: 15 vh;
}

.local-room .prompt {
  font-size: 2vh;
}
</style>
