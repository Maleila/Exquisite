import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue"; //.vue is necessary for Vite
import About from "@/views/About.vue";
import Exquisite from "@/views/Exquisite.vue";

const routes = [
  { path: "/", name: "Home", component: Home }, // Tell the router to render home component when the home route is visited
  { path: "/about", name: "About", component: About },
  { path: "/game", name: "Game", component: Exquisite },
];

// Create a router instance
const router = createRouter({
  history: createWebHistory(), // Create historys
  routes,
});

export default router;
