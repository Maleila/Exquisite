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
