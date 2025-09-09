// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBGjU3cASUiSQTQ5Fed4KgzjrUU_ui45-U",
  authDomain: "vite-contact-9f31f.firebaseapp.com",
  projectId: "vite-contact-9f31f",
  storageBucket: "vite-contact-9f31f.firebasestorage.app",
  messagingSenderId: "539076534702",
  appId: "1:539076534702:web:81ff3113ec2bf40db4683f",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
