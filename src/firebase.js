// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
// import { getAnalytics } from "firebase/analytics";

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCAr8uz9RUk-1Hy4gWKoc2bYUQvsr6Gjqc",
  authDomain: "crudwebb.firebaseapp.com",
  projectId: "crudwebb",
  storageBucket: "crudwebb.appspot.com",
  messagingSenderId: "377644526650",
  appId: "1:377644526650:web:f64cfcfdd61c0aab43d903"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
export {db}

