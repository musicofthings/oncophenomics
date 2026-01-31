import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyA2utMzRjNldJ2i0c22_1G4XXMV_EYqtGY",
  authDomain: "oncophenomics.firebaseapp.com",
  projectId: "oncophenomics",
  storageBucket: "oncophenomics.firebasestorage.app",
  messagingSenderId: "748028586003",
  appId: "1:748028586003:web:1657789dbdfaa6dc44b7e6",
  measurementId: "G-G1C8T5QD1M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);
