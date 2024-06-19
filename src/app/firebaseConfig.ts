import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyALMyVj31O7c2_1UyQg2XMwUdB-3RXp3TA",
  authDomain: "small-facebook-688c4.firebaseapp.com",
  projectId: "small-facebook-688c4",
  storageBucket: "small-facebook-688c4.appspot.com",
  messagingSenderId: "819312596757",
  appId: "1:819312596757:web:2c053589107be099527b1c",
  measurementId: "G-QZ4S3TYTCX",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
