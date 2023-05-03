import { createRouter, createWebHistory, parseQuery } from "vue-router";
import Home from "@/views/Home.vue"; //.vue is necessary for Vite
import About from "@/views/About.vue";
import Gameplay from "@/views/Gameplay.vue";
import JoinRoom from "@/views/JoinRoom.vue";
import Room from "@/views/Room.vue";
import MainGame from "@/views/MainGame.vue";

const routes = [
  { path: "/", name: "Home", component: Home }, // Tell the router to render home component when the home route is visited
  { path: "/about", name: "About", component: About },
  { path: "/gameplay", name: "Gameplay", component: Gameplay },
  { path: "/joinroom", name: "JoinRoom", component: JoinRoom },

  {
    path: "/room",
    name: "Room",
    component: Room,
    props: (route) => ({
      remote: route.query.remote === "true",
      host: route.query.host === "true",
    }),
  },
  {
    path: "/maingame",
    name: "MainGame",
    component: MainGame,
    props: (route) => ({
      playerNum: parseInt(route.query.playerNum, 10),
      playerNames: route.query.playerNames,
      // rounds: parseInt(route.query.rounds, 10),
      remote: route.query.remote === "true",
      host: route.query.host === "true",
      roomCode: route.query.roomCode,
      thisPlayer: route.query.thisPlayer,
    }),
  },
];

// Create a router instance
const router = createRouter({
  history: createWebHistory(), // Create historys
  routes: routes,
});

export default router;
