<script>
import { nextTick} from "vue";
export default {
  mounted() {
    //called when a component is added (ex when the page loads)
    this.focusInput();
  },
  data() {
    return {
      message: "",
      count: 0,
      players: 1,
      ishidden: true, //what specifically does this describe? like what's hidden or not?
      finished: false,
      story: "",
      msg1: "",
      invis: false,
    };
  },
  methods: {
    reset() {
      (this.message = ""),
        (this.count = 0),
        (this.players = 1),
        (this.ishidden = true),
        (this.finished = false),
        (this.story = ""),
        (this.msg1 = "");
    },
    submitStory() {
      this.count++,
      this.invis = true,
      setTimeout(() => this.transition(), 900);
      setTimeout(() => this.invis = false, 900);
    },
    transition() {
      (this.story = this.story.concat(this.message + " ")),
        (this.msg1 = this.message),
        (this.message = ""),
        this.focusInput()
    },
    submitPlayers() {
      this.count++, (this.ishidden = false), this.focusInput();
    },
    focusInput() {
      nextTick(() => {
        // Without the try and catch: Error message is: Uncaught (in promise) TypeError: Cannot read properties of undefined (reading 'focus')
        // Need a try and catch block b/c you can only access the ref after the component is mounted. So the first render this.$ref.storyInput is going to be null and raise a promise error. This try and catch block doesn't change the overall logic of this method and only serves as a way to reduce any errors on console. Reference: https://vuejs.org/guide/essentials/template-refs.html#accessing-the-refs
        try {
          this.$refs.storyInput.focus(); //need this bc vue gets confused since the input field has a v-if
        } catch (ex) {
          // Print out the error message, commented out to avoid clustering the console
          // console.log("Error detected: " + ex)
        }
      });
    },
  },
};
</script>

<template>
  <div class="start">
    <h1>Exquisite Corpse</h1>
    <h2 v-if="count == 0">Number of players: {{ players }}</h2>
    <!--<input v-if= "count == 0" v-model.number="players" @keydown.enter = "count++ , ishidden = false">-->
    <!--Looks like it's going to be more involved to check the type so this can be a temporary fix,
    although it limits the number of players-->
    <select v-if="count == 0" v-model="players">
      <option disabled value="">Select number of players</option>
      <option>1</option>
      <option>2</option>
      <option>3</option>
      <option>4</option>
      <option>5</option>
      <option>6</option>
    </select>
    <br v-if="count == 0" />
    <br v-if="count == 0" />
    <button @click="submitPlayers" v-if="count == 0">Submit</button>
    <router-link to="/" custom v-slot="{ navigate }">
      <button @click="navigate" role="link">Back</button>
    </router-link>

    <h2 v-if="!ishidden && count <= players">
      Player {{ count }}/{{ players }}:
      <br />
      <div v-if="count == 1">Start the story!</div>
      <div class = "invisibleInk" 
      :style = "{
      opacity: invis ? 0:1
      }"
      v-if="count > 1"> {{ msg1 }} 
      </div>
      <br />
      Add your sentence: {{ message }}
      <br />
      <input v-model="message" @keydown.enter="submitStory" ref="storyInput" />
    </h2>

    <button v-if="!ishidden && count <= players" @click="submitStory">
      Submit
    </button>

    <button
      v-on:click="(finished = true), (ishidden = !ishidden)"
      v-if="count > players && !ishidden"
    >
      View Story
    </button>

    <h3 v-if="finished && count > players">{{ story }}</h3>
    <br />
    <button @click="reset" v-if="finished && count > players">
      Play Again
    </button>
  </div>
</template>

<style scoped>
.invisibleInk {
  filter: opacity(100);
  transition: opacity 900ms ease-in-out;
  color:#56e1f0;
}
</style>
