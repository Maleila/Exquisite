<script>
export default {
  components: {
  },
  data() {
    return {
      rounds: 1,
      maxRounds: 6,
    };
  },
  methods: {
  }
}
</script>

<template>
<div class="prompt">
Number of rounds for this story:
</div>
<div class="selection-bar">
    <select v-model="rounds">
        <option disabled value="">Select number of rounds</option>
        <option v-for="n in maxRounds" :value="n">{{ n }}</option>
    </select>
</div>
<button @click="$emit('setRounds', rounds)">Add players</button>

</template>

<style>

</style>