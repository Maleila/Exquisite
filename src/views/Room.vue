<!--Page that coordinates game setup, including creating a room, entering a room,
inputting names, and starting the game, using the Lobby.vue and JoinRoom.vue child
components. "Local," "Join," and "Host" on the home page all direct here.-->

<script>
import Lobby from "@/views/Lobby.vue";
import JoinRoom from "@/views/JoinRoom.vue";
import InkButtonStart from "@/views/buttons/InkButtonStart.vue";
import InkButtonGame from "@/views/buttons/InkButtonGame.vue";
import { ref as dbRef, set, onValue } from "firebase/database";
import { useDatabase } from "vuefire";

export default {
  components: {
    Lobby,
    JoinRoom,
    InkButtonStart,
    InkButtonGame,
  },
  data() {
    return {
      playerNum: 1,
      playerNames: [],
      playersFB: [],
      thisPlayer: "",
      roomCode: "",

      addPlayers: false,
      enterCode: true,
      started: false,
      hasBox: true,
    };
  },
  methods: {
    //Called on "start a game" button clicked -- sets visibility of Lobby to true
    //and geenrates a room code if this player is the host on a remote game
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
    //called when Lobby component sends back this list (or single player)
    setPlayers(playerNames) {
      const db = useDatabase();
      const playersfb = dbRef(db, this.roomCode + "/players");

      //listen for changes to the list of players
      onValue(playersfb, (snapshot) => {
        const data = snapshot.val();
        const playersData = Object.keys(data);
        this.playersFB = playersData;
      });

      this.thisPlayer = playerNames[0];
      if (!this.remote) {
        this.playerNames = playerNames;
      } else {
        this.playerNames = this.playersFB;
      }
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

      //listen for the host telling the game to start -- when this happens,
      //grabs the final copy of the list of players from Firebase
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
    //grabs final copy of the list of players from Firebase
    finalizePlayers() {
      this.playerNames = this.playersFB;
      this.playerNum = this.playerNames.length;
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
    //sends props to MainGame to start game
    onStart() {
      const { playerNum, playerNames, remote, host, roomCode, thisPlayer } =
        this;
      this.$router.push({
        name: "MainGame",
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
        <InkButtonGame v-if="!addPlayers" @click="createRoom" />
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
        Waiting for others
      </div>
      <br />
      <div class="begin-story">
        <InkButtonStart
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
  font-size: 3em;
  width: 80%;
  margin: 0 auto;
  font-weight: 200;
  text-align: center;
  -webkit-text-stroke: 0.01em #000000;
}

.local-room .empty {
  height: 2.5em;
}

.local-room .start-box {
  height: 8em;
}

.local-room .begin-story {
  text-align: center;
  width: 8em;
  margin: 0 auto;
}

.local-room .waiting-message {
  font-size: 1em;
}
</style>
