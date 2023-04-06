<script setup>
import Exquisite from "./views/Exquisite.vue";
import HelloWorld from "./views/Exquisite.vue";
</script>

<template>
  <br />
  <router-view v-slot="{ Component }">
    <transition name="page-slide" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<style>
   body {
     background-image: url('./assets/clean paper.jpeg');
     background-repeat: no-repeat;
     background-position: center;
     background-size: cover;
   }
 </style>