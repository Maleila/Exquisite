<template>
  <br />
  <router-view v-slot="{ Component }">
    <component :is="Component" />
  </router-view>
</template>

<style>
body {
  background-image: url("./assets/clean paper.jpeg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
</style>
