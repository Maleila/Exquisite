<template>
  <div class="room">
    <h1>Room</h1>
    <div class="empty"></div>
    <div>
      <h2>Number of players: {{ playerNum }}</h2>

      <select v-model="playerNum">
        <option disabled value="">Select number of players</option>
        <option v-for="n in maxPlayers" :value="n">{{ n }}</option>
      </select>
    </div>

    <router-link to="/maingame" custom>
      <button @click="startGame()" role="link">START</button>
    </router-link>
    <router-link to="/" custom v-slot="{ navigate }">
      <button @click="navigate" role="link">Back</button>
    </router-link>
  </div>
</template>

<script>
import MainGame from "@/views/MainGame.vue";

export default {
  components: {
    MainGame,
  },
  data() {
    return {
      playerNum: 1,
      maxPlayers: 6,
    };
  },

  methods: {
    startGame() {
      const { playerNum } = this;
      this.$router.push({ name: "MainGame", query: { playerNum } });
    },
  },
};
</script>
