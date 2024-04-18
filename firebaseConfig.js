// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCFMwVebTngpqu1147ffSst_ki0ZdvZQ1w",
  authDomain: "mike-s-friendly-hold-em.firebaseapp.com",
  projectId: "mike-s-friendly-hold-em",
  storageBucket: "mike-s-friendly-hold-em.appspot.com",
  messagingSenderId: "21819895841",
  appId: "1:21819895841:web:25a5d4aa891fd44ab4f360",
  measurementId: "G-XG54KCBLYF"
};

// Initialize Firebase
// Firebase Default App initialized before using any service
const app = initializeApp(firebaseConfig); 

export const auth = getAuth();
export const db = getFirestore(app);
