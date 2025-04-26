// src/firebase.js

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";  // Import Firestore
import { getAuth } from "firebase/auth";            // If you want to include authentication

const firebaseConfig = {
  apiKey: "AIzaSyA7vxsFIBtXpTzpr6xtw-tvJ5xqkqwTzug",
  authDomain: "pulse-and-threads.firebaseapp.com",
  projectId: "pulse-and-threads",
  storageBucket: "pulse-and-threads.firebasestorage.app",
  messagingSenderId: "289225606825",
  appId: "1:289225606825:web:9dd90a68b3c4cb5255cbb8",
  measurementId: "G-3B3VV2VQE8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app); // Initialize Firestore
const auth = getAuth(app);    // Initialize Auth (if you need it)

export { app, analytics, db, auth };
