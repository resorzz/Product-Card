import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCobSZQUHabWvYLnBTuz-knVnZXTGfG_HY",
  authDomain: "productcard-3a7b8.firebaseapp.com",
  projectId: "productcard-3a7b8",
  storageBucket: "productcard-3a7b8.firebasestorage.app",
  messagingSenderId: "601174371008",
  appId: "1:601174371008:web:5c2af6c9f843dedf775b25"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);