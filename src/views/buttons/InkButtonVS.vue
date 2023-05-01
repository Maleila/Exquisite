<template>
  <div class="ink-button">
    <router-link to="/localviewstory" custom v-slot="{ navigate }">
      <button @click="navigate" role="link">View Story</button>
    </router-link>
  </div>
</template>

<style scoped>
.ink-button {
  background-image: url("../../assets/inkVS.svg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: 70vh;
  transition: 0.2s;
}

.ink-button button {
  font-size: 15vh;
  font-weight: 100;
  color: #ffffff;
  background: None;
  height: 15vh;
  width: 70vh;
  border: None;
  padding-bottom: 18vh;
  font-family: "CalorieRegular";
}

.ink-button:hover {
  filter: drop-shadow(2px 3px 1px rgb(0 0 0 / 0.3));
}
.ink-button button:hover {
  -webkit-text-stroke: 0.1vh #ffffff;
}
</style>
