// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getFirestore, enableIndexedDbPersistence } from "firebase/firestore";
import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFunctions } from "firebase/functions";

const firebaseConfig = {
  apiKey: "AIzaSyA7vxsFIBtXpTzpr6xtw-tvJ5xqkqwTzug",
  authDomain: "pulse-and-threads.firebaseapp.com",
  projectId: "pulse-and-threads",
  storageBucket: "pulse-and-threads.appspot.com", // Fixed storage bucket URL
  messagingSenderId: "289225606825",
  appId: "1:289225606825:web:9dd90a68b3c4cb5255cbb8",
  measurementId: "G-3B3VV2VQE8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Analytics only in client-side and when supported
let analytics;
if (typeof window !== 'undefined') {
  isSupported().then((isSupported) => {
    if (isSupported) {
      analytics = getAnalytics(app);
    }
  });
}

// Initialize Firestore with offline persistence
const db = getFirestore(app);
enableIndexedDbPersistence(db).catch((err) => {
  if (err.code === 'failed-precondition') {
    console.warn('Offline persistence can only be enabled in one tab at a time.');
  } else if (err.code === 'unimplemented') {
    console.warn('Current browser does not support offline persistence.');
  }
});

// Initialize Auth with persistence
const auth = getAuth(app);
setPersistence(auth, browserLocalPersistence)
  .catch((error) => {
    console.error('Error setting auth persistence:', error);
  });

// Initialize Storage
const storage = getStorage(app);

// Initialize Cloud Functions
const functions = getFunctions(app);

// Export all initialized services
export { 
  app, 
  analytics, 
  db, 
  auth, 
  storage, 
  functions 
};