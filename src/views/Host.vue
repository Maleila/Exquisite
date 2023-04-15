<script>
export default {
  methods: { 
    join() {
      const host = false;
      const remote = true;
      this.$router.push({ name: "LocalRoom", query: { host, remote } });
    },
    host() {
      const host = true;
      const remote = true;
      this.$router.push({ name: "LocalRoom", query: { host, remote } });
    }
  }
}
</script>


<template>
  <div id = "format">
    <div>
    <h1>Host</h1>
    <router-link to="/localroom" custom v-slot="{ navigate }">
      <button @click="navigate, host()" role="link">Create a room</button>
    </router-link>
    </div>
    
    <div>
    <h1>Join</h1>
    <router-link to="/localroom" custom v-slot="{ navigate }">
      <button @click="navigate, join()" role="link">Join a room</button>
    </router-link>
    </div>
  </div>
</template>

<style scoped>
#format{
  display: flex;
  justify-content: space-around;
  align-items: center;
}
</style>