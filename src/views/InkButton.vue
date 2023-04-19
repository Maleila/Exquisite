<template>
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
  background-size: 40vh;
}

.ink-button button {
  font-size: 4vh;
  font-weight: 100;
  color: white;
  background: None;
  height: 25vh;
  width: 10vh;
  border: None;
  padding-right: 9vh;
  padding-bottom: 2vh;
  font-family: Avenir;
  /* float: right; */
  /* transition: font-size 0.3s ease-in-out; */
  -webkit-text-stroke: 0.5px white;
  /* font-family: Desyre; */
  /* font-family: "CalorieRegular"; */
}

/* .ink-button button:hover {
  font-size: 15vh;
  -webkit-text-stroke: 0.5px black;
} */
</style>
