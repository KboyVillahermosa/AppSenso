// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAtTfXlFs9-6a1bfb4rBqKs0UAsM-FyLOE",
  authDomain: "appsenso-d8962.firebaseapp.com",
  projectId: "appsenso-d8962",
  storageBucket: "appsenso-d8962.firebasestorage.app",
  messagingSenderId: "480064930183",
  appId: "1:480064930183:web:302394bcc9185a75571322",
  measurementId: "G-QCP1GM4HS9"
};

const app = initializeApp(firebaseConfig);

// Initialize services
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, googleProvider, db };