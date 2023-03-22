<template>
  <div class="text-page">
    <h1>Room</h1>
    <p>room</p>
    <router-link to="/game" custom v-slot="{ navigate }">
      <button @click="navigate" role="link">START</button>
    </router-link>
    <router-link to="/" custom v-slot="{ navigate }">
      <button @click="navigate" role="link">Back</button>
    </router-link>
  </div>
</template>
