<script>
import InkButton from "@/views/InkButton.vue";

export default {
  props: {
    story: {
      type: String,
      required: true,
    },
  },
  components: {
    InkButton,
  },
};
</script>

<template>
  <div class="empty"></div>
  <div class="story">{{ story }}</div>
  <div class="empty"></div>

  <div class="back"><InkButton /></div>

  <!-- <router-link to="/" custom v-slot="{ navigate }">
    <button @click="navigate" role="link">Back</button>
  </router-link> -->
  <!-- <div class="close-image">
    <router-link to="/" custom v-slot="{ navigate }">
      <img src="@/assets/close.svg" @click="navigate" role="link" />
    </router-link>
  </div> -->
</template>

<style>
.story {
  width: 80%;
  margin: 0 auto;
  text-align: left;
  font-family: Desyre;
  font-size: 3em;
}

.empty {
  height: 10vh;
}

.close-image {
  width: 1em;
  height: auto;
}
</style>
