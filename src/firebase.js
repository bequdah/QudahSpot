import { initializeApp } from "firebase/app";
import { initializeFirestore } from "firebase/firestore";
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

// Use Long Polling to bypass firewall/WebSocket restrictions on some networks (like university Wi-Fi)
export const db = initializeFirestore(app, {
    experimentalForceLongPolling: true,
});

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export default app;
