<script>
import inkImage from "@/assets/ink.png";
</script>

<template>
  <!-- <img src="../assets/ink.png" /> -->
  <div class="container">
    <router-link to="/" custom v-slot="{ navigate }">
      <button @click="navigate" role="link">Back</button>
    </router-link>
  </div>
</template>

<style scoped>
.container {
  background-image: url("../assets/ink.png");
  background-repeat: no-repeat;
  background-position: center;
  background-size: 20%;
}

.container button {
  font-size: 20px;
  color: white;
  background: None;
  height: 200px;
  border: None;
}
</style>
