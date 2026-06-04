// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyC2gSbooGsHSev6XVvw2GrdUKrNWQM7e9I",
  authDomain: "ecommerce-website-e6cbe.firebaseapp.com",
  projectId: "ecommerce-website-e6cbe",
  storageBucket: "ecommerce-website-e6cbe.firebasestorage.app",
  messagingSenderId: "867535573696",
  appId: "1:867535573696:web:71f80123256ea7d5a95325",
  measurementId: "G-F4Z72JFKVY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);