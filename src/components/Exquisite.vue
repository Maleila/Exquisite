<script>
export default {
    data() {
      return {
        message: '',
        count : 0,
        players : 1,
        ishidden : true, //what specifically does this describe? like what's hidden or not?
        finished: false,
        story: '',
        msg1: ''
      }
    }
}
</script>

<template>
  <div class = "start">
    <h1>
      Exquisite Corpse
    </h1>
    <h2 v-if= "count == 0">
    Number of players: {{players}}
    </h2>
    <input v-if= "count == 0" v-model="players">
      <br>
      <br>
    <button v-on:click="count++ , ishidden = false" v-if="count == 0">Submit</button>
    
    <h2 v-for= "i in players" v-if="!ishidden && count <= players">
    Player {{count}}/{{players}} write your sentence:
      <br>
      {{msg1}}
      <br>
      {{message}}
      <br>
    <input v-model="message">
    </h2>
    
    <button v-if="!ishidden && count <= players" v-on:click="count++ , story = story.concat(message + ' '), msg1 = message, message = ''">Submit</button>
      

    <button v-on:click= "finished = true, ishidden = ! ishidden" v-if="count > players && !ishidden">
      View Story
    </button>
    
    <h3 v-if="finished && count > players">{{story}}</h3>
    
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
