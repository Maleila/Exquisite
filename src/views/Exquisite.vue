<script>
import { nextTick} from "vue";
export default {
  mounted() {
    //called when a component is added (ex when the page loads)
    this.focusInput();
  },
  data() {
    return {
      current: "",
      count: 0,
      players: 1,
      ishidden: true, //what specifically does this describe? like what's hidden or not?
      finished: false,
      story: "",
      previous: "",
      invis: false,
    };
  },
  methods: {
    reset() {
      (this.current = ""),
        (this.count = 0),
        (this.players = 1),
        (this.ishidden = true),
        (this.finished = false),
        (this.story = ""),
        (this.previous = "");
    },
    submitStory() {
      this.invis = true;
      setTimeout(() => this.transition(), 900);
    },
    transition() {
      this.count++;
      (this.story = this.story.concat(this.previous + " ")),
      this.invis = false, //want it to fade out but not back in basically... the fade in is what's causing the weird flashing effect
        (this.previous = this.current),
        (this.current = ""),
        this.focusInput()
    },
    submitPlayers() {
      this.count++, (this.ishidden = false), this.focusInput();
    },
    viewStory() {
      this.story = this.story.concat(this.previous),
      console.log(this.previous),
      console.log(this.current),
      this.finished = true,
      this.ishidden = !this.ishidden
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
      <!--<div v-if="count == 1">Start the story!</div>-->
      <div class = "storytest"> {{ story }}
    </div>
      <div class = "invisibleInk" 
      :style = "{
      opacity: invis ? 0.2:1
      }"
      v-if="count > 1"> {{ previous + " "}}
      </div>
      <!--Add your sentence: {{ current }}-->
      <div class = "ink">
        {{ current }}
      </div>
      <br />
      <input v-model="current" @keydown.enter="submitStory" ref="storyInput" />
    </h2>

    <button v-if="!ishidden && count <= players" @click="submitStory">
      Submit
    </button>

    <button
      @click="viewStory"
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
  display: inline;
  filter: opacity(100);
  transition: opacity 900ms ease-in-out;
  color:#56e1f0;
}

.ink {
  display: inline;
  color:#56e1f0;
}

.storytest {
  opacity: 0.1;
  display: inline;
}
</style>
