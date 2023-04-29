<script>
export default {
  data() {
    return {
      showButtons: false,
      isRemote: true,
    };
  },
  methods: {
    startLocal() {
      const remote = false;
      const host = false;
      this.$router.push({ name: "LocalRoom", query: { remote, host } });
    },
    linkRemote() {
      this.isRemote = false;
      this.showButtons = true;
    },
    join() {
      const host = false;
      const remote = true;
      this.$router.push({ name: "LocalRoom", query: { host, remote } });
    },
    host() {
      const host = true;
      const remote = true;
      this.$router.push({ name: "LocalRoom", query: { host, remote } });
    },
    
  },
};
</script>
<!-- Homepage, using router to go to other components -->
<template>
  <div class="home">
    <h1>Exquisite</h1>
    <h4>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;A COLLABORATIVE STORY WRITING GAME</h4>
    <br>
    <br>
    <div class="button">
      <router-link to="/localroom" custom v-slot="{ navigate }">
        <button @click="navigate, startLocal()" role="link">LOCAL</button>
      </router-link>

      <button v-if="isRemote" @click="linkRemote">REMOTE</button>
      <div v-if="showButtons" class="side-buttons">
        <router-link to="/localroom" custom v-slot="{ navigate }">
          <button @click="navigate, host()" role="link">HOST</button>
        </router-link>
        |
        <router-link to="/localroom" custom v-slot="{ navigate }">
          <button @click="navigate, join()" role="link">JOIN</button>
        </router-link>
      </div>
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
  color: #484848;
  font-family: "CalorieRegular";
  font-size: 55vh;
  line-height: 35vh;
  margin: 0;
}

.home h4 {
  filter: drop-shadow(2px 3px 1px rgb(0 0 0 / 0.3));
  color: #484848;
  font-family: inherit;
  font-size: 3vh;
  font-weight: 100;
  margin-bottom: 3.5vh;
  border: none;
  background: none;
  letter-spacing: 0.3vh;
  transition: 0.3s;
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

.home .side-buttons {
  color: #434343;
  font-family: inherit;
  font-size: 3vh;
  font-weight: 100;
  letter-spacing: 0.3vh;
}
</style>
