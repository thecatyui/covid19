import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCPyHm1PCjh2uh8WTxB0TKaH6ad_-FYzKk",
    authDomain: "covid-19-1122c.firebaseapp.com",
    projectId: "covid-19-1122c",
    storageBucket: "covid-19-1122c.appspot.com",
    messagingSenderId: "1012864758605",
    appId: "1:1012864758605:web:4740aed65be1d40c447d04",
    measurementId: "G-2EW2DBB8WY"
  };
  
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore()

export default db