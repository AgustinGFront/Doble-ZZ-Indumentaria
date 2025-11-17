// Firebase imports - usando CDN de Google
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js"; 


const firebaseConfig = {
   apiKey: "AIzaSyAeGaAsMzOgGK6_sNnadF__sPhZffdruVQ",
    authDomain: "doble-zz.firebaseapp.com",
    projectId: "doble-zz",
    storageBucket: "doble-zz.firebasestorage.app",
    messagingSenderId: "100271780635",
    appId: "1:100271780635:web:d2a851a902fdc5d65a99be",
    measurementId: "G-0NZCW0TJJQ"
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