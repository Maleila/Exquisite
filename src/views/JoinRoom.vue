<script>
export default {
  data() {
    return {
      playerName: "",
      roomCodeJoin: "",
      submit: false,
    }
  },
  methods: {
    
  }
}
</script>


<template>
  <div id="enterRoom">
    <h2>Room Code</h2>
    <input v-model="roomCodeJoin">
    <h2>Name</h2>
    <input v-model="playerName">
    <br>
    <button @click="enterRoom, submit = true">
      Go
    </button>
    <div v-if="submit">
    {{playerName}} has joined {{ roomCodeJoin }}
    </div>
    
  </div>
</template>

<style scoped>
h2 {
   font: ; 
}
</style>