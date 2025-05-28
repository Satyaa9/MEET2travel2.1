// firebase-script.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// Your Firebase config object (replace with your actual config)
const firebaseConfig = {
  apiKey: "AIzaSyCjVniHmkTVrDr50WPD9pMjaX8O0zhxXpQ",
  authDomain: "meetravel-4e037.firebaseapp.com",
  projectId: "meetravel-4e037",
  storageBucket: "meetravel-4e037.firebasestorage.app",
  messagingSenderId: "546278170596",
  appId: "1:546278170596:web:5572e52d9d06b0faf831f1",
  measurementId: "G-03SYEX4LE3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Form Submission
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const mobile = document.getElementById("mobile").value;
    const email = document.getElementById("email").value;

    try {
      await addDoc(collection(db, "maldivesBookings"), {
        name,
        mobile,
        email,
        timestamp: new Date()
      });
      alert("Booking confirmed and saved to Firebase!");
      form.reset();
    } catch (error) {
      console.error("Error saving booking:", error);
      alert("Error saving data. Check console for details.");
    }
  });
});