import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

// import "../public/style.css";

// Comment these two lines
import "../public/main.css";
import "../public/css/home.css";
import "../public/css/mainGame.css";
import "../public/css/room.css";
import "../public/css/gamePlay.css";

createApp(App).use(router).mount("#app");
