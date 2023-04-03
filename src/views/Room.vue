<template>
  <div class="room">
    <!-- <h1>Room</h1> -->
    <!-- <div class="empty"></div> -->

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

    <!-- <select v-model="playerNum">
      <option disabled value="">Select number of players</option>
      <option v-for="n in maxPlayers" :value="n">{{ n }}</option>
    </select> -->

    <div class="empty"></div>

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
          <img src="@/assets/back.svg" @click="startGame()" role="link" />
        </router-link>
      </div>
    </div>
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
