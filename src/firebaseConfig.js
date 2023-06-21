import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyCXVdRkLbWiJ144sRRFUIAPxCY5bfMZbvQ",
  authDomain: "smartvisit-pisa.firebaseapp.com",
  projectId: "smartvisit-pisa",
  storageBucket: "smartvisit-pisa.appspot.com",
  messagingSenderId: "6445253746",
  appId: "1:6445253746:web:4b34da90d32ae688446eeb"
};

// Create the connection with Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();