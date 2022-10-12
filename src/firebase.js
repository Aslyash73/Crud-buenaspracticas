// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'fireba/firestore';
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD7qZvMg1g2XzKIpqeAsdvY193H5eWiFZE",
  authDomain: "crudbpracticasw.firebaseapp.com",
  projectId: "crudbpracticasw",
  storageBucket: "crudbpracticasw.appspot.com",
  messagingSenderId: "984126797974",
  appId: "1:984126797974:web:5679d4f762762419382ab7",
  measurementId: "G-XS0WWEF2VW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
export {db}