<script>
import { nextTick } from "vue";
export default {
  mounted() {
    //called when a component is added (ex when the page loads)
    this.focusInput();
  },
  data() {
    return {
      current: "",
      count: 1,
      finished: false,
      story: "",
      previous: "",
      invis: false,
    };
  },
  methods: {
    reset() {
      (this.current = ""),
        (this.count = 1),
        (this.finished = false),
        (this.story = ""),
        (this.previous = "");
    },
    edit(e) {
      this.current = e.target.textContent;
      document.getElementById("editable").innerHTML = document.getElementById("editable").getAttribute("placeholder");
      this.submitStory()
    },
    submitStory() {
      console.log("submitting story");
      console.log(this.current);

      this.invis = true;
      setTimeout(() => this.transition(), 900);
    },
    transition() {
      this.count++;
      (this.story = this.story.concat(this.previous + " ")),
        //remove transition for resetting opacity to 1, then re-add after the story is updated
        // document.getElementById("prev").classList.add("notransition"),
        // (document.getElementById("prev").style.opacity = 1),
        // document.getElementById("prev").offsetHeight,
        // document.getElementById("prev").classList.remove("notransition"),
        (this.invis = false),
        (this.previous = this.current),
        (this.current = ""),
        this.focusInput();
    },
    viewStory() {
      (this.story = this.story.concat(this.previous)),
      (this.finished = true);
    },
    focusInput() {
      nextTick(() => {
        // Without the try and catch: Error message is: Uncaught (in promise) TypeError: Cannot read properties of undefined (reading 'focus')
        // Need a try and catch block b/c you can only access the ref after the component is mounted. So the first render this.$ref.storyInput is going to be null and raise a promise error. This try and catch block doesn't change the overall logic of this method and only serves as a way to reduce any errors on console. Reference: https://vuejs.org/guide/essentials/template-refs.html#accessing-the-refs
        try {
          //this.$refs.storyInput.focus(); //need this bc vue gets confused since the input field has a v-if
        } catch (ex) {
          // Print out the error message, commented out to avoid clustering the console
          console.log("Error detected: " + ex);
        }
      });
    },
  },
  props: {
    playerNum: {
      type: Number,
      required: true,
    },
  },
};
</script>

<template>
  <div class="start">
    <h2 v-if="!finished && count <= playerNum">
      Player {{ count }}/{{ playerNum }}:
      <br />
      <!--<div class="storytest">{{ story }}</div>
      <div
        id="prev"
        class="invisibleInk"
        :style="{
          opacity: invis ? 0.2 : 1,
        }"
        v-if="count > 0"
      >
        {{ previous + " " }}
      </div>-->
      
      <div class="story">
        {{story}}
        <span class="previous-sentence"  :style="{
          opacity: invis ? 0.2 : 1,
        }"
        v-if="count > 0">
        {{ previous + " " }}
        </span>
        <span class="new-text" id = "editable" placeholder = "" contenteditable @keydown.enter="edit">
            edit this text!
        </span>
    </div>

      <!--<div class="ink">
        {{ current }}
      </div>
      <br />
      <input v-model="current" @keydown.enter="submitStory" ref="storyInput" />-->
    </h2>

    <button v-if="!finished && count <= playerNum" @click="submitStory">
      Submit
    </button>

    <button @click="viewStory" v-if="count > playerNum && !finished">
      View Story
    </button>

    <h3 v-if="finished && count > playerNum">{{ story }}</h3>
    <br />
    <button @click="reset" v-if="finished && count > playerNum">
      Play Again
    </button>

    <router-link to="/" custom v-slot="{ navigate }">
      <button @click="navigate" role="link">Back</button>
    </router-link>
  </div>
</template>

<style scoped>

.story {
    color: #ccc;
    text-align: left !important;
}

.story .previous-sentence {
  color: black;
  text-align: left !important;
}

.story .new-text {
    color: black;
    text-align: left !important;
}
.story .new-text:focus-visible {
    outline: none !important;
}
.invisibleInk {
  display: inline;
  filter: opacity(100);
  transition: opacity 900ms ease-in-out;
  color: #56e1f0;
}

.notransition {
  transition: none !important;
}

.ink {
  display: inline;
  color: #56e1f0;
}

.storytest {
  opacity: 0.1;
  display: inline;
}
</style>