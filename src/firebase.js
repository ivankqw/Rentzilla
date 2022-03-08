
import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyD2848pREvxcAcLDFPSIfVC1qiCN-cU9FI",
    authDomain: "rentzilla-dev.firebaseapp.com",
    projectId: "rentzilla-dev",
    storageBucket: "rentzilla-dev.appspot.com",
    messagingSenderId: "428374709783",
    appId: "1:428374709783:web:28d50f67c663f03e5e6e52",
    measurementId: "G-KEG6245ZMT"
  };

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

export {auth}