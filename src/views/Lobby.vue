<script>
export default {
  data() {
    return {
      playerNames: [],
      playerNum: 1,
      name: "",
    };
  },
  methods: {
    addPlayer() {
        if(this.playerNum == 1) {
            this.playerNames[0] = this.name;
        } else {
            this.playerNames[this.playerNum-1] = this.name;
        }
        this.name = "";
        this.playerNum++;
    }
  }
}
</script>

<template>
    <div>
    Players:
    </div>
    <li v-for="item in playerNames">
        {{ item }}
    </li>

    <input v-model="name">
    <br>
    <button @click="addPlayer">Add</button>
    <br>
    <button @click="$emit('setPlayers', playerNames)">Start</button>
</template>

<style>

</style>