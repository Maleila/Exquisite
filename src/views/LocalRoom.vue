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
    startRoom() {
      const { playerNum } = this;
      this.$router.push({ name: "localGame", query: { playerNum } });
    },
  },
};
</script>

<template>
  <div class="local-room">
    <h2>Players</h2>

    <div class="selection-bar">
      <select v-model="playerNum">
        <option disabled value="">Select number of players</option>
        <option v-for="n in maxPlayers" :value="n">{{ n }}</option>
      </select>
    </div>

    <p>{{ playerNum }}</p>
    <!-- <p>ONE</p> -->

    <div class="send-all">
      <div class="back-image">
        <router-link to="/" custom v-slot="{ navigate }">
          <img src="@/assets/back.svg" @click="navigate" role="link" />
        </router-link>
      </div>
      <div class="send-image">
        <router-link to="/localGame" custom v-slot="{ navigate }">
          <img src="@/assets/back.svg" @click="startRoom" role="link" />
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
