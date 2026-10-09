// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "vingo-aeee4.firebaseapp.com",
  projectId: "vingo-aeee4",
  storageBucket: "vingo-aeee4.firebasestorage.app",
  messagingSenderId: "784755681336",
  appId: "1:784755681336:web:3de96fd41d9e148601decd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
export {app,auth}