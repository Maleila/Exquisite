<script>
import InkButtonB from "@/views/buttons/InkButtonB.vue";

export default {
  props: {
    story: {
      type: String,
      required: true,
    },
  },
  components: {
    InkButtonB,
  },
};
</script>

<template>
  <div class="view-story">
    <div class="empty"></div>
    <div class="story">{{ story }}</div>
    <div class="empty"></div>

    <div class="back"><InkButtonB /></div>
  </div>
</template>

<style>
.view-story .story {
  width: 80%;
  margin: 0 auto;
  text-align: left;
  font-family: Desyre;
  font-size: 3em;
}

.view-story .empty {
  height: 10vh;
}

.view-story .back {
  transform: scale(0.8);
  width: 30%;
  float: right;
}
</style>
