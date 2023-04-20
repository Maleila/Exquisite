<template>
  <div class="ink-button">
    <router-link to="/" custom v-slot="{ navigate }">
      <button @click="navigate" role="link">BACK</button>
    </router-link>
  </div>
</template>

<style scoped>
.ink-button {
  background-image: url("../assets/ink2.svg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: 40vh;
  transition: 0.2s;
}

.ink-button button {
  font-size: 3.5vh;
  font-weight: 100;
  color: #e1e1e1;
  background: None;
  height: 25vh;
  width: 30vh;
  border: None;
  font-family: inherit;
  /* transition: font-size 0.3s ease-in-out; */
  /* font-family: Desyre; */
  /* font-family: "CalorieRegular"; */
}

.ink-button:hover {
  filter: drop-shadow(2px 3px 1px rgb(0 0 0 / 0.3));
}
.ink-button button:hover {
  text-decoration: underline;
}
/* .ink-button button:hover {
  font-size: 15vh;
  -webkit-text-stroke: 0.5px black;
} */
</style>
