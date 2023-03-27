<template>
  <div class="text-page">
    <h1>Gameplay</h1>
  </div>
  <p>
    <b>To begin a local game,</b> assemble a group of friends around a table and choose the corresponding number
     of players. After the first player hits submit, pass the laptop to the next player. Make sure not to let
     other players view the screen until their turn!

     <b>To begin a remote game,</b> click "Remote" to generate a room code which you can share with friends. After everyone
     has joined, the game can begin with each player on their own device. (I'll edit this one later since we don't
     know the details yet).
  </p>

  <router-link to="/" custom v-slot="{ navigate }">
    <button @click="navigate" role="link">Back</button>
  </router-link>
</template>
