// lib/firebase.ts
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCvHGJ9pucHkEVEpNMh5ij_IRQTdWUf280",
  authDomain: "devsphere-ed8da.firebaseapp.com",
  projectId: "devsphere-ed8da",
  storageBucket: "devsphere-ed8da.firebasestorage.app",
  messagingSenderId: "356519587631",
  appId: "1:356519587631:web:14e63cc011b59df456fbda",
};

// Initialize once
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);

}

export const db = firebase.firestore();
db?console.log("success db"):console.log("Not db")
export const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp;
