<script>
import { nextTick } from "vue";
import contenteditable from "vue-contenteditable";

export default {
  components: {
    contenteditable
  },
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
      this.current = "";
      this.count = 1;
      this.finished = false;
      this.story = "";
      this.previous = "";
    },
    submitStory() {
      this.invis = true;
      setTimeout(() => this.transition(), 900);
    },
    transition() {
      this.count++;
      this.story = this.story.concat(this.previous + " ");
      //remove transition for resetting opacity to 1, then re-add after the story is updated
      document.getElementById("prev").classList.add("notransition");
      document.getElementById("prev").style.opacity = 1;
      document.getElementById("prev").offsetHeight;
      document.getElementById("prev").classList.remove("notransition");
      this.invis = false;
      this.previous = this.current;
      this.current = "";
      this.focusInput();
    },
    viewStory() {
      this.story = this.story.concat(this.previous);
      this.finished = true;
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
      <div class="story">
        <span class="invisible">
          {{ story }}
        </span>
        <span class="previous-sentence" id="prev" :style="{
          opacity: invis ? 0.2 : 1,
        }"
        v-if="count > 0">
        {{ previous }}
        <contenteditable tag="span" class="new-text" id="editable" ref="storyInput" :no-nl="true" :no-html="true" v-model="current" @keydown.enter="submitStory">
        </contenteditable>
        </span>
    </div>
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
      <button
        @click="navigate"
        role="link"
        v-if="finished && count > playerNum"
      >
        Back
      </button>
    </router-link>
  </div>
</template>

<style scoped>

#editable:after {
  content: "";
  display: inline-block;
  width: 2em;
}
.story {
  color: black;
  text-align: left !important;
}

.story .invisible {
  opacity: 0.1;
}

.story .previous-sentence {
  color: black;
  filter: opacity(100);
  transition: opacity 900ms ease-in-out;
  text-align: left !important;
}

.story .new-text {
  color: black;
  text-align: left !important;
}
.story .new-text:focus-visible {
  outline: none !important;
}
.notransition {
  transition: none !important;
}
</style>
