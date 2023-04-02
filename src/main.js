import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

// import "../public/style.css";

// Comment these two lines
import "../public/main.css";
import "../public/css/home.css";

createApp(App)
    .use(router)
    .mount("#app");
