<script>
import inkImage from "@/assets/ink.png";
</script>

<template>
  <!-- <img src="../assets/ink.png" /> -->
  <div class="ink-button">
    <router-link to="/" custom v-slot="{ navigate }">
      <button @click="navigate" role="link">Back</button>
    </router-link>
  </div>
</template>

<style scoped>
.ink-button {
  background-image: url("../assets/ink2.svg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100%;
}

.ink-button button {
  font-size: 10vh;
  color: white;
  background: None;
  height: 15vh;
  width: 10vh;
  border: None;
  /* font-family: Desyre; */
  font-family: "CalorieRegular";
}
</style>
