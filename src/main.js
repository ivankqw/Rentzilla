import { createApp } from 'vue'
import App from './App.vue'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import router from './router/index.js'
import { initializeApp } from 'firebase/app'
import store from './store/index.js'


const firebaseConfig = {
    apiKey: "AIzaSyD2848pREvxcAcLDFPSIfVC1qiCN-cU9FI",
    authDomain: "rentzilla-dev.firebaseapp.com",
    projectId: "rentzilla-dev",
    storageBucket: "rentzilla-dev.appspot.com",
    messagingSenderId: "428374709783",
    appId: "1:428374709783:web:28d50f67c663f03e5e6e52",
    measurementId: "G-KEG6245ZMT"
  };

initializeApp(firebaseConfig);

createApp(App).use(store).use(router).mount('#app')
