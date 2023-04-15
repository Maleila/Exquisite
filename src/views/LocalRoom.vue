<script>
import Rounds from "@/views/Rounds.vue";
import Lobby from "@/views/Lobby.vue";

export default {
  components: {
    Rounds,
    Lobby,
  },
  data() {
    return {
      playerNum: 1,
      playerNames: [],
      rounds: 1,
      addPlayers: false,
      roundSelect: true,
    };
  },
  methods: {
    setRounds(rounds) {
      this.rounds = rounds;
      this.roundSelect = false;
      this.addPlayers = true;
    },
    setPlayers(playerNames) {
      this.playerNames = playerNames;
      this.playerNum = this.playerNames.length;
      this.startGame();
    },
    startGame() {
      const { playerNum, playerNames, rounds } = this;
      this.$router.push({ name: "LocalGame", query: { playerNum, playerNames, rounds } });
    },
  },
};
</script>

<template>
  <div class="local-room">
    <div class="empty"></div> <!--what is this for??-->
    <div class="title">Game Settings</div>

    <Rounds v-if="roundSelect" @setRounds="setRounds"/>
    <div v-if="addPlayers">
      Rounds: {{ rounds }}
      <Lobby @setPlayers = "setPlayers"/>
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