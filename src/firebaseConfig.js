import { initializeApp } from "firebase/app";
import { getFirestore } from '@firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCItGrIlF3d4t1Hzsw3Js316CKsSFgfYng",
  authDomain: "smartvisit-saw.firebaseapp.com",
  projectId: "smartvisit-saw",
  storageBucket: "smartvisit-saw.appspot.com",
  messagingSenderId: "1006404951082",
  appId: "1:1006404951082:web:c1531ca241011db169f753"
};

// Create the connection with Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);