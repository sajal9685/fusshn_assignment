import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyC4_JrxdnnAKSGm_cZTU9mNC4GtTZV1rLE",
  authDomain: "bookingapp-f6150.firebaseapp.com",
  databaseURL: "https://bookingapp-f6150-default-rtdb.firebaseio.com/", 
  projectId: "bookingapp-f6150",
  storageBucket: "bookingapp-f6150.firebasestorage.app",
  messagingSenderId: "644773215465",
  appId: "1:644773215465:web:4d2e8f0ad2070173c68478",
  measurementId: "G-N560RJ5QKP"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
export const auth=getAuth(app);


export { db };

 