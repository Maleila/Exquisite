<template>
  <div class="title">
    <h1>Exquisite</h1>
    <h1>Corpse</h1>
  </div>
  <div class="empty"></div>
  <div class="button">
    <router-link to="/game" custom v-slot="{ navigate }">
      <button @click="navigate" role="link">LOCAL</button>
    </router-link>

    <router-link to="/room" custom v-slot="{ navigate }">
      <button @click="navigate" role="link">REMOTE</button>
    </router-link>

    <router-link to="/about" custom v-slot="{ navigate }">
      <button @click="navigate" role="link">ABOUT</button>
    </router-link>

    <router-link to="/gameplay" custom v-slot="{ navigate }">
      <button @click="navigate" role="link">GAMEPLAY</button>
    </router-link>
  </div>
</template>
