<template>
  <div class="home">
    <h1>Exquisite</h1>

    <div class="empty"></div>
    <div class="button">
      <router-link to="/localRoom" custom v-slot="{ navigate }">
        <button @click="navigate" role="link">LOCAL</button>
      </router-link>

      <router-link to="/host" custom v-slot="{ navigate }">
        <button @click="navigate" role="link">REMOTE</button>
      </router-link>

      <router-link to="/about" custom v-slot="{ navigate }">
        <button @click="navigate" role="link">ABOUT</button>
      </router-link>

      <router-link to="/gameplay" custom v-slot="{ navigate }">
        <button @click="navigate" role="link">GAMEPLAY</button>
      </router-link>
    </div>
  </div>
</template>
