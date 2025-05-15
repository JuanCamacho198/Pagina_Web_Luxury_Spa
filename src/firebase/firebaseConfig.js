// src/firebase/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAPlVt5ws0czEpXupelTW-I4NkoeSyQMOk",
  authDomain: "luxuryspa-5f99f.firebaseapp.com",
  projectId: "luxuryspa-5f99f",
  storageBucket: "luxuryspa-5f99f.firebasestorage.app",
  messagingSenderId: "1086390236506",
  appId: "1:1086390236506:web:6c1bbef57350921f726f63",
  measurementId: "G-CP7YC1E1Y1"
};

const app = initializeApp(firebaseConfig);

// Export Firebase Auth and Firestore instances
export const auth = getAuth(app);
export const db = getFirestore(app);
export { app };