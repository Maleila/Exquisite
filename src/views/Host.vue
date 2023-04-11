<script>
export default {
  data() {
    return {
      hostName: "",
      message: "",
    }
  },
  methods: {
    enterName() {
      this.message = this.hostName;
    }
  }
}
</script>


<template>
  <div id="enterName">
    <h2>Name</h2>
    <input v-model="hostName">
    <br>
    <button @click="enterName">
      Go
    </button>
    {{ message }}
  </div>
</template>

<style scoped>
</style>