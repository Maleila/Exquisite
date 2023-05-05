<template>
  <div class="ink-button">
    <button>START</button>
  </div>
</template>

<style scoped>
.ink-button {
  background-image: url("../../assets/inkR.svg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: 10em;
  transition: 0.2s;
  height: 7em;
  width: 10em;
}

.ink-button button {
  font-size: 2.5em;
  font-weight: 100;
  color: #ffffff;
  background: None;
  height: 2.8em;
  width: 4em;
  border: None;
  font-family: inherit;
  padding-right: 1.5em;
  padding-bottom: 0.2em;
  font-family: "CalorieRegular";
  -webkit-text-stroke: 0.03em #ffffff;
}

.ink-button:hover {
  filter: drop-shadow(2px 3px 1px rgb(0 0 0 / 0.3));
}
.ink-button button:hover {
  -webkit-text-stroke: 0.04em #ffffff;
}
</style>
