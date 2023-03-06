<script>
import { nextTick } from 'vue'
export default {
  mounted() { //called when a component is added (ex when the page loads)
    this.focusInput()
  },
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
    },
    methods: {
      reset() {
        this.message = '',
        this.count = 0,
        this.players = 1,
        this.ishidden = true,
        this.finished = false,
        this.story = '',
        this.msg1 = ''
      },
      submitStory() {
        this.count++ ,
        this.story = this.story.concat(this.message + ' '),
        this.msg1 = this.message,
        this.message = '',
        this.focusInput()
      },
      submitPlayers() {
        this.count++,
        this.ishidden = false,
        this.focusInput()
      },
      focusInput() {
        nextTick(() => {
          this.$refs.storyInput.focus() //need this bc vue gets confused since the input field has a v-if
        });
    },     
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
    <!--<input v-if= "count == 0" v-model.number="players" @keydown.enter = "count++ , ishidden = false">-->
    <!--Looks like it's going to be more involved to check the type so this can be a temporary fix,
    although it limits the number of players-->
    <select v-if= "count == 0" v-model="players">
      <option disabled value="">Select number of players</option>
      <option>1</option>
      <option>2</option>
      <option>3</option>
      <option>4</option>
      <option>5</option>
      <option>6</option>
    </select>
      <br v-if="count == 0">
      <br v-if="count == 0">
    <button @click='submitPlayers' v-if="count == 0">Submit</button>
    
    <h2 v-if="!ishidden && count <= players">
    Player {{count}}/{{players}} write your sentence:
      <br>
      {{msg1}}
      <br>
      {{message}}
      <br>
    <input v-model="message" @keydown.enter= 'submitStory' ref = "storyInput">
  </h2>
    
    <button v-if="!ishidden && count <= players" @click= 'submitStory'>Submit</button>
      
    <button v-on:click= "finished = true, ishidden = ! ishidden" v-if="count > players && !ishidden">
      View Story
    </button>
    
    <h3 v-if="finished && count > players">{{story}}</h3>
    <br>
    <button @click = 'reset' v-if="finished && count > players">Play Again</button>
    
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
