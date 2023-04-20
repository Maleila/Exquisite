<script>
export default {
  methods: {
    startLocal() {
      const remote = false;
      const host = false;
      this.$router.push({ name: "LocalRoom", query: { remote, host } });
    },
  },
};
</script>

<template>
  <div class="home">
    <h1>Exquisite</h1>
    <div class="empty"></div>
    <div class="button">
      <router-link to="/localroom" custom v-slot="{ navigate }">
        <button @click="navigate, startLocal()" role="link">LOCAL</button>
      </router-link>

      <router-link to="/remote" custom v-slot="{ navigate }">
        <button @click="navigate" role="link">REMOTE</button>
      </router-link>

      <router-link to="/about" custom v-slot="{ navigate }">
        <button @click="navigate" role="link">ABOUT</button>
      </router-link>

      <router-link to="/gameplay" custom v-slot="{ navigate }">
        <button @click="navigate" role="link">GAMEPLAY</button>
      </router-link>
    </div>
  </div>
</template>

<style>
.home h1 {
  filter: drop-shadow(2px 3px 1px rgb(0 0 0 / 0.3));
  -webkit-text-stroke: 3px #484848;
  color: #484848;
  font-family: "CalorieRegular";
  font-size: 55vh;
  line-height: 35vh;
  margin: 0;
}

.home .button {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
}

.home .button button {
  color: #434343;
  font-family: inherit;
  font-size: 3vh;
  font-weight: 100;
  margin-bottom: 3.5vh;
  border: none;
  background: none;
  letter-spacing: 0.3vh;
  transition: 0.3s;
}

.home .button button:hover {
  text-decoration: underline;
  filter: drop-shadow(2px 3px 1px rgb(0 0 0 / 0.3));
}

.home .empty {
  height: 18vh;
}
</style>
