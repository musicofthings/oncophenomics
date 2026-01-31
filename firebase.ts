import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyA2utMzRjNldJ2i0c22_1G4XXMV_EYqtGY",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "oncophenomics.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "oncophenomics",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "oncophenomics.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "748028586003",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:748028586003:web:1657789dbdfaa6dc44b7e6",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-G1C8T5QD1M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);
