<template>
  <div class="ink-button">
    <button>View Story</button>
  </div>
</template>

<style scoped>
.ink-button {
  background-image: url("../../assets/inkVS.svg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: 60vh;
  transition: 0.2s;
}

.ink-button button {
  font-size: 14vh;
  font-weight: 100;
  color: #ffffff;
  background: None;
  height: 15vh;
  width: 60vh;
  border: None;
  padding-bottom: 18vh;
  padding-right: 3vh;
  font-family: "CalorieRegular";
}

.ink-button:hover {
  filter: drop-shadow(2px 3px 1px rgb(0 0 0 / 0.3));
}
.ink-button button:hover {
  -webkit-text-stroke: 0.1vh #ffffff;
}
</style>
