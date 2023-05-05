<!-- Homepage, using router to navigate to Gameplay page, About page,
local game or remote game -->

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
      this.$router.push({ name: "Room", query: { remote, host } });
    },
    linkRemote() {
      this.isRemote = false;
      this.showButtons = true;
    },
    join() {
      const host = false;
      const remote = true;
      this.$router.push({ name: "Room", query: { host, remote } });
    },
    host() {
      const host = true;
      const remote = true;
      this.$router.push({ name: "Room", query: { host, remote } });
    },
  },
};
</script>
<template>
  <div class="home">
    <h1>Exquisite</h1>
    <h4>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;A COLLABORATIVE STORY WRITING GAME
    </h4>
    <br />
    <br />
    <div class="button">
      <router-link to="/room" custom v-slot="{ navigate }">
        <button @click="navigate, startLocal()" role="link">LOCAL</button>
      </router-link>

      <button v-if="isRemote" @click="linkRemote">REMOTE</button>
      <div v-if="showButtons" class="side-buttons">
        <router-link to="/room" custom v-slot="{ navigate }">
          <button @click="navigate, host()" role="link">HOST</button>
        </router-link>
        |
        <router-link to="/room" custom v-slot="{ navigate }">
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
  font-size: 30em;
  line-height: 0.55em;
  margin: 0;
}

.home h4 {
  color: #484848;
  font-family: inherit;
  font-size: 1.5em;
  font-weight: 100;
  margin-bottom: 1em;
  border: none;
  background: none;
  letter-spacing: 0.2em;
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
  font-size: 1.5em;
  font-weight: 100;
  margin-bottom: 1em;
  border: none;
  background: none;
  letter-spacing: 0.2em;
  transition: 0.3s;
}

.home .button button:hover {
  text-decoration: underline;
  filter: drop-shadow(2px 3px 1px rgb(0 0 0 / 0.3));
}

.home .side-buttons {
  color: #434343;
  font-family: inherit;
  font-size: 1em;
  font-weight: 100;
  letter-spacing: 0.3em;
}
</style>
