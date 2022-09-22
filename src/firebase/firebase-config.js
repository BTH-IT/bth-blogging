import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBxBuoD640u8VaGv8qlrTw7OPlHhvv9Q8A",
  authDomain: "hung-blogging.firebaseapp.com",
  projectId: "hung-blogging",
  storageBucket: "hung-blogging.appspot.com",
  messagingSenderId: "91461336292",
  appId: "1:91461336292:web:6cd39a92ac9a0582d980f1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
