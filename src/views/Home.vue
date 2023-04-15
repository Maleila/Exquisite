<script>
  export default {
    methods: {
      startLocal() {
        const remote = false;
        const host = false;
        this.$router.push({ name: "LocalRoom", query: { remote , host} });
      }
    }
  }
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
