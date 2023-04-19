<script>
import InkButton from "@/views/InkButton.vue";

export default {
  components: {
    InkButton,
  },
};
</script>

<template>
  <div class="gameplay">
    <div class="title">Gameplay</div>
    <div class="empty"></div>
    <div class="text">
      <b>To begin a local game,</b> assemble a group of friends around a table
      and choose the corresponding number of players. After the first player
      hits submit, pass the laptop to the next player. Make sure not to let
      other players view the screen until their turn!
      <br />
      <br />
      <b>To begin a remote game,</b> click "Remote" to generate a room code
      which you can share with friends. After everyone has joined, the game can
      begin with each player on their own device. (I'll edit this one later
      since we don't know the details yet).
    </div>
    <div class="empty"></div>
    <div class="back"><InkButton /></div>
  </div>
</template>

<style>
.gameplay .title {
  color: #484848;
  /* font-family: Desyre; */
  font-family: "CalorieRegular";
  font-size: 8em;
  width: 80%;
  margin: 0 auto;
  font-weight: 200;
  text-align: left;
  line-height: 20vh;
}
.gameplay .text {
  color: #484848;
  /* font-family: Desyre; */
  /* font-family: "CalorieRegular"; */
  font-size: 1.2em;
  width: 80%;
  margin: 0 auto;
  font-weight: 200;
  text-align: left;
  line-height: 1.7em;
}
.gameplay .empty {
  height: 1vh;
}
.gameplay .back {
  transform: scale(0.8);
  width: 30%;
  float: right;
}
</style>
