// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDkao2B1WKVZozlqtf3hhEaVky447MeNwk",
  authDomain: "homenest-9a289.firebaseapp.com",
  projectId: "homenest-9a289",
  storageBucket: "homenest-9a289.firebasestorage.app",
  messagingSenderId: "80419196548",
  appId: "1:80419196548:web:4edc7621da4f814bb37cd1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
