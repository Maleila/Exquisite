<template>
  <div class="game-play">
    <div class="empty"></div>
    <h1>Gameplay</h1>
    <div class="empty"></div>
    <div class="text">
      <p style="font-size: 2em; font-family: Desyre">
        <b>To begin a local game,</b> assemble a group of friends around a table
        and choose the corresponding number of players. After the first player
        hits submit, pass the laptop to the next player. Make sure not to let
        other players view the screen until their turn!
        <br />
        <br />
        <b>To begin a remote game,</b> click "Remote" to generate a room code
        which you can share with friends. After everyone has joined, the game
        can begin with each player on their own device. (I'll edit this one
        later since we don't know the details yet).
      </p>
    </div>
    <div class="empty"></div>
    <div class="back">
      <router-link to="/" custom v-slot="{ navigate }">
        <img src="@/assets/close.svg" @click="navigate" role="link" />
      </router-link>
    </div>
  </div>
</template>

<style>
.game-play h1 {
  color: #434343;

  font-size: 4em;
  font-weight: 900;
  line-height: 0.4em;
}

.game-play .text p {
  color: #434343;
  font-size: 1.2em;
  font-weight: 200;
  width: 80%;
  text-align: center;
  margin: auto;
}

.game-play .text {
  width: 100%;
  margin: 0 auto;
  text-align: center;
}

/* .room .back-image {
    position: absolute;
    top: 0;
    left: 0;
    padding: 10px;
  } */

.game-play .back img {
  width: 3em;
  height: auto;
}

.game-play .button {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
}

.game-play button {
  color: #434343;
  font-family: inherit;
  font-size: 1.5rem;
  font-weight: 100;
  margin-bottom: 2.2rem;
  border: none;
  background: none;
  letter-spacing: 0.1em;
  transition: 0.3s;
}

.game-play button:hover {
  text-decoration: underline;
}

.game-play .empty {
  height: 3em;
}
</style>
