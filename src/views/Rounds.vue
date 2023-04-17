<script>
export default {
  data() {
    return {
      rounds: 1,
      maxRounds: 6,
    };
  },
};
</script>

<template>
  <div class="prompt">Rounds: {{ rounds }}</div>
  <div class="selection-bar">
    <select v-model="rounds">
      <option disabled value="">Select number of rounds</option>
      <option v-for="n in maxRounds" :value="n">{{ n }}</option>
    </select>
  </div>
  <div class="prompt">Players:</div>
  <button @click="$emit('setRounds', rounds)">Add players</button>
</template>

<style>
.prompt {
  font-size: 2vh;
}
</style>
