// firebase.js
import { initializeApp } from "firebase/app";
import {
  initializeAuth,
  getReactNativePersistence,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAs5VK7OVQ39v1hazIycRfpCwi8KQnZRuA",
  authDomain: "login-register-5243e.firebaseapp.com",
  projectId: "login-register-5243e",
  storageBucket: "login-register-5243e.firebasestorage.app",
  messagingSenderId: "483051599257",
  // nëse ke edhe appId, measurementId etj – LERI, mos i fshi
};

const app = initializeApp(firebaseConfig);

// ✅ Auth me AsyncStorage që punon në React Native
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

const db = getFirestore(app);

export { app, auth, db, signOut, onAuthStateChanged };
