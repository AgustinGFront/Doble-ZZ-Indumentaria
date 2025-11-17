// Firebase imports - usando CDN de Google
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBdQbiu0zcaxMEIhf7ght83QVfRZ5wd0W0", 
  authDomain: "doble-zz-3685f.firebaseapp.com",
  projectId: "doble-zz-3685f",
  storageBucket: "doble-zz-3685f.firebasestorage.app",
  messagingSenderId: "1020448708385",
  appId: "1:1020448708385:web:62b5332f7a1c25321ed060",
  measurementId: "G-47JM6X7NQN"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Auth functions
const loginWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    throw error;
  }
};

const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Error al cerrar sesión:', error);
    throw error;
  }
};