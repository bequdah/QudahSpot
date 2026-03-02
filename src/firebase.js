import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDpbX7OoktVw64pVp9K7n82n4ygLq4vVyk",
    authDomain: "qudahspot.firebaseapp.com",
    projectId: "qudahspot",
    storageBucket: "qudahspot.firebasestorage.app",
    messagingSenderId: "660951132821",
    appId: "1:660951132821:web:e8c67be84fdd45062a499c"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export default app;
