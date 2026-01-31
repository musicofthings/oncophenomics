import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// This configuration will be automatically populated by the AI Studio Firebase plugin 
// when connected. For now, we use a placeholder structure.
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDummyKeyForInitialization",
  authDomain: "oncophenomics.firebaseapp.com",
  projectId: "oncophenomics",
  storageBucket: "oncophenomics.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
