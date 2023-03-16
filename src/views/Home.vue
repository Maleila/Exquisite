<template>
  <div>
    <router-link to="/game" custom v-slot="{ navigate }">
      <button @click="navigate" role="link">START</button>
    </router-link>

    <router-link to="/about" custom v-slot="{ navigate }">
      <button @click="navigate" role="link">ABOUT</button>
    </router-link>

    <router-link to="/gameplay" custom v-slot="{ navigate }">
      <button @click="navigate" role="link">GAMEPLAY</button>
    </router-link>
    
  </div>
</template>
