<script>
export default {
  props: {
    story: {
      type: String,
      required: true,
    },
  },
};
</script>

<template>
  <div class="local-view-story">
    <div class="story">{{ story }}</div>
    <router-link to="/" custom v-slot="{ navigate }">
      <button @click="navigate" role="link">Back</button>
    </router-link>
  </div>
</template>

<style>
.local-view-story .story {
  width: 80%;
  margin: 0 auto;
  text-align: left;
  font-family: Desyre;
  font-size: 2em;
}
</style>
