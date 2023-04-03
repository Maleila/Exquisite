<template>
  <div class="room">
    <!-- <h1>Room</h1> -->
    <!-- <div class="empty"></div> -->

    <h2>Please select the number of players</h2>

    <div class="empty"></div>

    <h2>{{ playerNum }}</h2>

    <div class="empty"></div>

    <select v-model="playerNum">
      <option disabled value="">Select number of players</option>
      <option v-for="n in maxPlayers" :value="n">{{ n }}</option>
    </select>

    <div class="empty"></div>

    <router-link to="/maingame" custom>
      <button @click="startGame()" role="link">START</button>
    </router-link>
    <div class="back-button"></div>
    <router-link to="/" custom v-slot="{ navigate }">
      <button @click="navigate" role="link">-></button>
    </router-link>
    <!-- <div class="empty"></div> -->
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
