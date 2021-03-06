import { createApp } from "vue";
import App from "./App.vue";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import router from "./router/index.js";
import { initializeApp } from "firebase/app";
import store from "./store/index.js";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faPhone,
  faCircle,
  faChartPie,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import VueChartKick from "vue-chartkick";
import "chartkick/chart.js";
import VueTour from "v3-tour";
import "v3-tour/dist/vue-tour.css";

library.add(faPhone);
library.add(faCircle);
library.add(faChartPie);

const firebaseConfig = {
  apiKey: "AIzaSyD2848pREvxcAcLDFPSIfVC1qiCN-cU9FI",
  authDomain: "rentzilla-dev.firebaseapp.com",
  projectId: "rentzilla-dev",
  storageBucket: "rentzilla-dev.appspot.com",
  messagingSenderId: "428374709783",
  appId: "1:428374709783:web:28d50f67c663f03e5e6e52",
  measurementId: "G-KEG6245ZMT",
};

initializeApp(firebaseConfig);

VueChartKick.options = {
  colors: [
    "#003f5c",
    "#374c80",
    "#7a5195",
    "#bc5090",
    "#ef5675",
    "#ff764a",
    "#ffa600",
    "#FBE8D3",
    "#a85d65",
    "#d0ff66",
  ],
  // colors: [
  //   "#50D8D7",
  //   "#474044",
  //   "#FFC145",
  //   "#12664F",
  //   "#a682e8",
  //   "#5d8aa8",
  //   "#6dd09e",
  //   "#9be9e5",
  //   "#a85d65",
  //   "#d0ff66",
  // ],
  // colors: ["#2C3E50", "#F85F73", "#FBE8D3", "#928A97", "#827397"],
};

const dapp = createApp(App)
  .use(store)
  .use(router)
  .use(VueChartKick)
  .use(VueTour)
  .component("font-awesome-icon", FontAwesomeIcon);

window.tours = dapp.config.globalProperties.$tours;

dapp.mount("#app");
