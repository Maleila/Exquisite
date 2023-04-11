<script>
export default {
  data() {
  },
  methods: { 
  }
}
</script>


<template>
  <div id = "format">
    <div>
    <h1>Host</h1>
    <router-link to="/room" custom v-slot="{ navigate }">
      <button @click="navigate" role="link">Create a room</button>
    </router-link>
    </div>
    
    <div>
    <h1>Join</h1>
    <router-link to="/joinroom" custom v-slot="{ navigate }">
      <button @click="navigate" role="link">Join a room</button>
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