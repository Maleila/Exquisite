<!--Page with light instructions on starting a local game and
starting or joining a remote game-->

<script>
import InkButtonBack from "@/views/buttons/InkButtonBack.vue";

export default {
  components: {
    InkButtonBack,
  },
};
</script>

<template>
  <div class="gameplay">
    <div class="title">Gameplay</div>
    <div class="empty"></div>
    <div class="text">
      <b>To begin a local game,</b> assemble a group of friends around a table
      and have everyone enter their name. After the first player hits submit,
      pass the laptop to the next player. Make sure not to let other players
      view the screen until their turn!
      <br />
      <br />
      <b>To begin a remote game,</b> click "Remote" to generate a room code
      which you can share with friends. After everyone has joined, the host can
      start the game and each player will be able to play on their own device.
    </div>
    <div class="empty"></div>
    <div class="back"><InkButtonBack /></div>
  </div>
</template>

<style>
.gameplay .title {
  color: #484848;
  font-family: "CalorieRegular";
  font-size: 8em;
  width: 80%;
  margin: 0 auto;
  font-weight: 200;
  text-align: left;
  line-height: 1.5em;
  filter: drop-shadow(1px 2px 1px rgb(0 0 0 / 0.3));
}
.gameplay .text {
  color: #484848;
  font-size: 1.2em;
  width: 80%;
  margin: 0 auto;
  font-weight: 200;
  text-align: left;
  line-height: 1.7em;
}
.gameplay .empty {
  height: 1em;
}
.gameplay .back {
  transform: scale(0.8);
  width: 30%;
  float: right;
}
</style>
