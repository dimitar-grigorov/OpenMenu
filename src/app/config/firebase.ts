import { initializeApp } from "firebase/app";
import 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';

// Web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "openmenu-8ef47.firebaseapp.com",
    projectId: "openmenu-8ef47",
    storageBucket: "openmenu-8ef47.appspot.com",
    messagingSenderId: "966397919999",
    appId: "1:966397919999:web:2d68a0dd0b4a87cc7602ca"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);