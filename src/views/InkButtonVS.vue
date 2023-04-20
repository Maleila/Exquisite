<template>
  <div class="ink-button">
    <router-link to="/localviewstory" custom v-slot="{ navigate }">
      <button @click="navigate" role="link">View Story</button>
    </router-link>
  </div>
</template>

<style scoped>
.ink-button {
  background-image: url("../assets/inkVS.svg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: 40vh;
  transition: 0.2s;
}

.ink-button button {
  font-size: 8vh;
  font-weight: 100;
  color: #ededed;
  background: None;
  height: 15vh;
  width: 40vh;
  border: None;
  /* transition: font-size 0.3s ease-in-out; */
  /* font-family: inherit; */
  /* font-family: Desyre; */
  font-family: "CalorieRegular";
}

.ink-button:hover {
  filter: drop-shadow(2px 3px 1px rgb(0 0 0 / 0.3));
}
.ink-button button:hover {
  /* text-decoration: underline; */
  -webkit-text-stroke: 0.1vh #e1e1e1;
}
/* .ink-button button:hover {
    font-size: 15vh;
    -webkit-text-stroke: 0.5px black;
  } */
</style>
