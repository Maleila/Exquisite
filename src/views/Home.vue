<template>
  <div>
    <router-link to="/game" custom v-slot="{ navigate }">
      <button @click="navigate" role="link">START</button>
    </router-link>
  </div>
</template>
