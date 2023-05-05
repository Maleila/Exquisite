<template>
  <div class="ink-button">
    <router-link to="/" custom v-slot="{ navigate }">
      <button @click="navigate" role="link">BACK</button>
    </router-link>
  </div>
</template>

<style scoped>
.ink-button {
  background-image: url("../../assets/inkB.svg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: 20em;
  transition: 0.2s;
}

.ink-button button {
  font-size: 4em;
  font-weight: 100;
  color: #ffffff;
  background: None;
  height: 3em;
  width: 3em;
  border: None;
  font-family: inherit;
  padding-bottom: 0.2em;
  font-family: "CalorieRegular";
  -webkit-text-stroke: 0.02em #ffffff;
}

.ink-button:hover {
  filter: drop-shadow(2px 3px 1px rgb(0 0 0 / 0.3));
}
.ink-button button:hover {
  -webkit-text-stroke: 0.04em #ffffff;
}
</style>
