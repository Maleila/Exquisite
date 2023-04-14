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
import "../public/css/about.css";
import "../public/css/localRoom.css";

import { initializeApp } from "firebase/app";
import { VueFire, VueFireAuth } from "vuefire";

const firebaseConfig = {
  apiKey: "AIzaSyCH1x552ujn1A2cl1ZRzDdIdel5w4Ri_R8",
  authDomain: "exquisiteremote.firebaseapp.com",
  databaseURL: "https://exquisiteremote-default-rtdb.firebaseio.com",
  projectId: "exquisiteremote",
  storageBucket: "exquisiteremote.appspot.com",
  messagingSenderId: "678976484214",
  appId: "1:678976484214:web:aca3a815501c231bf90057",
};

createApp(App)
  .use(VueFire, {
    firebaseApp: initializeApp(firebaseConfig),
    modules: [VueFireAuth()],
  })
  .use(router)
  .mount("#app");
