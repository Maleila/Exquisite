<script setup>
import Exquisite from './views/Exquisite.vue'
import {ref , onMounted} from 'vue'
import db from '@/firebase'
import { collection, getDocs } from 'firebase/firestore'


// import HelloWorld from "./views/Exquisite.vue";
onMounted(async() => {
  const querySnapshot = await getDocs(collection(db, "exquisite"));
  let gameValues = []
  querySnapshot.forEach((doc) => {
    console.log(doc.id, " => ", doc.data())
    const play = {
      id : doc.id,
      game: doc.data().game,
      player: doc.data().player,
      message: doc.data().message
    }
    gameValues.push(play)
  })
  gameValuesM.value = gameValues
})

</script>

<template>
  <!-- <Exquisite /> -->
  <br />
  <div class="container">
    <router-view />
    <!-- here we want the home component to show up  -->
  </div>
</template>

<style scoped>
@import 'bulma/css/bulma.min.css';
</style>
