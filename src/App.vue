<script setup>
import Exquisite from "./views/Exquisite.vue";
import HelloWorld from "./views/Exquisite.vue";
</script>

<template>
  <br />
  <transition name="slide" mode="out-in">
    <router-view></router-view>
  </transition>
  <!-- <router-view /> -->
</template>
