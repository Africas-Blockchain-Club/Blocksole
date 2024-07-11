// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBKqAXQN2H6l6Z8Acd-Wqhg6n8OvkeH0-o",
  authDomain: "troops-970a7.firebaseapp.com",
  projectId: "troops-970a7",
  storageBucket: "troops-970a7.appspot.com",
  messagingSenderId: "767665689927",
  appId: "1:767665689927:web:9618013404f253bd2f2862",
  measurementId: "G-TDGPJG6N96"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore(app);

export { db };