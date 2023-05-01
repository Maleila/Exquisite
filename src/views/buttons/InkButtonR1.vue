<template>
  <div class="ink-button">
    <button>ADD</button>
  </div>
</template>

<style scoped>
.ink-button {
  background-image: url("../../assets/inkR.svg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: 20vh;
  transition: 0.2s;
  height: 15vh;
  width: 20vh;
}

.ink-button button {
  font-size: 5vh;
  font-weight: 100;
  color: #ffffff;
  background: None;
  height: 20vh;
  width: 30vh;
  border: None;
  font-family: inherit;
  padding-right: 20vh;
  padding-bottom: 6vh;
  font-family: "CalorieRegular";
  -webkit-text-stroke: 0.15vh #ffffff;
}

.ink-button:hover {
  filter: drop-shadow(2px 3px 1px rgb(0 0 0 / 0.3));
}
.ink-button button:hover {
  -webkit-text-stroke: 0.2vh #ffffff;
}
</style>
