<script>
import Lobby from "@/views/Lobby.vue";
import JoinRoom from "@/views/JoinRoom.vue";
import InkButtonR1 from "@/views/buttons/InkButtonR1.vue";
import InkButtonR2 from "@/views/buttons/InkButtonR2.vue";
import InkButtonR3 from "@/views/buttons/InkButtonR3.vue";
import { ref as dbRef, set, onValue } from "firebase/database";
import { useDatabase } from "vuefire";

export default {
  components: {
    Lobby,
    JoinRoom,
    InkButtonR1,
    InkButtonR2,
    InkButtonR3,
  },
  mounted() {},
  data() {
    return {
      playerNum: 1,
      playerNames: [],
      playersFB: [],
      thisPlayer: "",
      addPlayers: false,
      enterCode: true,
      started: false,
      hasBox: true,
      roomCode: "",
    };
  },
  methods: {
    createRoom() {
      this.hasBox = false;
      this.addPlayers = true;
      if (this.host) {
        this.randRoomCode();
      }
    },
    //Generates a new room and adds it to firebase -- only called for the host
    randRoomCode() {
      var row_password = Array(5)
        .fill("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz")
        .map(function (x) {
          return x[Math.floor(Math.random() * x.length)];
        })
        .join(""); //Source: https://www.pakainfo.com/generate-random-password-in-vue-js/
      this.roomCode = row_password;

      const db = useDatabase();

      const roomCodeFB = dbRef(db, this.roomCode);
      set(roomCodeFB, {
        created: true,
      });

      const startedFB = dbRef(db, this.roomCode + "/gameAttributes/started");
      set(startedFB, false);
    },
    //add specified player to firebase list (remote) or set players to specified list and start game (local)
    setPlayers(playerNames) {
      const db = useDatabase(); //only for remote - add if
      const playersfb = dbRef(db, this.roomCode + "/players");

      //listen for changes to the list of players
      onValue(playersfb, (snapshot) => {
        const data = snapshot.val();
        const playersData = Object.keys(data);
        this.playersFB = playersData;
      });

      this.thisPlayer = playerNames[0];
      console.log("this player: " + this.thisPlayer);
      if (!this.remote) {
        this.playerNames = playerNames;
      } else {
        this.playerNames = this.playersFB;
      }
      console.log("player names: " + this.playerNames);
      this.playerNum = this.playerNames.length;
      if (!this.remote) {
        this.startGame();
      }
    },
    //for joining remotely, enters the specified room and listens for the game starting
    enterRoomCode(roomCode) {
      this.roomCode = roomCode;
      this.enterCode = false;

      this.addPlayers = true;

      const db = useDatabase();
      const startedFB = dbRef(db, this.roomCode + "/gameAttributes");

      //listen for the host telling the game to start -- when this happens, grab the final copy of the list of players from Firebase
      onValue(startedFB, (snapshot) => {
        const data = snapshot.val();
        const start = Object.values(data);
        this.started = start[0];
        if (this.started == true) {
          this.finalizePlayers();
          this.onStart();
        }
      });
    },
    //grab final copy of the list of players from Firebase
    finalizePlayers() {
      this.playerNames = this.playersFB;
      this.playerNum = this.playerNames.length;
      console.log("final players: " + this.playerNames);
    },
    //for host, sets the current player to the first in the list and tells firebase to start the game for all players
    //for host and playing locally, shows an alert for fewer than 2 players
    startGame() {
      if (this.remote) {
        const db = useDatabase();
        this.finalizePlayers();
        if (this.playerNum >= 2) {
          const playerNumFB = dbRef(
            db,
            this.roomCode + "/gameAttributes/zcount"
          );
          set(playerNumFB, 0);

          const startedFB = dbRef(
            db,
            this.roomCode + "/gameAttributes/started"
          );
          set(startedFB, true);
          this.onStart();
        } else {
          alert("Wait for more players");
        }
      } else {
        if (this.playerNum >= 2) {
          this.onStart();
        } else {
          alert("Add more players");
        }
      }
    },
    //sends props to LocalMainGame to start game
    onStart() {
      const { playerNum, playerNames, remote, host, roomCode, thisPlayer } =
        this;
      this.$router.push({
        name: "LocalGame",
        query: {
          playerNum,
          playerNames,
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

    <div class="title">Game Settings</div>

    <JoinRoom
      v-if="remote && !host && enterCode"
      @enterRoomCode="enterRoomCode"
    />

    <div v-if="(remote && host) || !remote" class="settings">
      <div v-if="hasBox" class="start-button">
        <div class="start-box"></div>
        <InkButtonR3 v-if="!addPlayers" @click="createRoom" />
      </div>
    </div>

    <div v-if="addPlayers">
      <div v-if="remote">Room Code: {{ roomCode }}</div>
      <br />
      <Lobby
        :roomCode="roomCode"
        :remote="remote"
        :host="host"
        @setPlayers="setPlayers"
      />
      <div class="waiting-message" v-if="remote && playersFB.length == 1">
        Waiting for others ...
      </div>
      <div class="begin-story">
        <InkButtonR2
          v-if="host && playersFB.length >= 2"
          @click="startGame()"
        />
      </div>
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
  -webkit-text-stroke: 0.05vh #000000;
}

.local-room .prompt {
  font-size: 2vh;
}

.local-room .buttons {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.local-room .empty {
  height: 5vh;
}

.local-room .start-box {
  height: 15vh;
}

.local-room .begin-story {
  text-align: center;
  width: 18vh;
  margin: 0 auto;
}

.local-room .waiting-message {
  font-size: 2vh;
}
</style>
