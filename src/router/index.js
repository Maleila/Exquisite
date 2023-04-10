import { createRouter, createWebHistory, parseQuery } from "vue-router";
import Home from "@/views/Home.vue"; //.vue is necessary for Vite
import About from "@/views/About.vue";
import Gameplay from "@/views/Gameplay.vue";
import Exquisite from "@/views/Exquisite.vue";
import Room from "@/views/Room.vue";
import MainGame from "@/views/MainGame.vue";

const routes = [
  { path: "/", name: "Home", component: Home }, // Tell the router to render home component when the home route is visited
  { path: "/about", name: "About", component: About },
  { path: "/game", name: "Game", component: Exquisite },
  { path: "/gameplay", name: "Gameplay", component: Gameplay },
  { path: "/room", name: "Room", component: Room },
  {
    path: "/maingame",
    name: "MainGame",
    component: MainGame,
    props: (route) => ({
      playerNum: parseInt(route.query.playerNum, 10),
      roomCode: route.query.roomCode,
    }),
  },
];

// Create a router instance
const router = createRouter({
  history: createWebHistory(), // Create historys
  routes: routes,
});

export default router;
