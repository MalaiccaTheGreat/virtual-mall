// src/testFirestore.js
import { db } from './firebase'; // Import Firestore from your firebase.js
import { doc, setDoc, getDoc } from 'firebase/firestore';

// Function to add data to Firestore
async function addData() {
  const docRef = doc(db, "users", "user_id"); // Change to the collection and document ID you want

  try {
    await setDoc(docRef, {
      name: "John Doe",
      email: "john.doe@example.com"
    });
    console.log("Document successfully written!");
  } catch (error) {
    console.error("Error writing document: ", error);
  }
}

// Function to get data from Firestore
async function getData() {
  const docRef = doc(db, "users", "user_id"); // Change to the collection and document ID you want

  try {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
    } else {
      console.log("No such document!");
    }
  } catch (error) {
    console.error("Error getting document:", error);
  }
}

// Run functions
addData(); // Test adding data
getData(); // Test getting data
