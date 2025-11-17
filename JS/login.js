
import { 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  onAuthStateChanged, 
  signOut 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { auth, googleProvider } from './firebase.js'; 

export function inicializarLogin() { 
  // 1. Buscamos el contenedor principal de la página de login
  const loginContainer = document.getElementById('login-container');
  
  // Si no estamos en la página de login, no hacemos nada.
  if (!loginContainer) {
    return;
  }

  // 2. Revisamos el estado de autenticación
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // --- USUARIO YA ESTÁ LOGUEADO ---
      // Reemplazamos el formulario por un saludo y botón de logout
      
      const displayName = user.displayName || user.email.split('@')[0];
      const photoURL = user.photoURL;

      loginContainer.innerHTML = `
        <div class="text-center">
          ${photoURL 
            ? `<img src="${photoURL}" alt="${displayName}" class="h-16 w-16 rounded-full mx-auto mb-4 border-2 border-gray-300">`
            : `<div class="h-16 w-16 rounded-full mx-auto mb-4 bg-blue-600 text-white flex items-center justify-center text-2xl font-bold">${displayName ? displayName[0].toUpperCase() : '?'}</div>`
          }
          
          <h2 class="text-2xl font-bold mb-2">¡Hola, ${displayName}!</h2>
          <p class="text-gray-600 mb-6">Ya has iniciado sesión.</p>
          
          <button id="btn-logout-page" class="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition">
            Cerrar Sesión
          </button>
          
          <a href="../index.html" class="block w-full bg-gray-200 text-gray-800 py-2 rounded-lg mt-3 hover:bg-gray-300 transition">
            Volver a la tienda
          </a>
        </div>
      `;
      
      // Agregamos el listener al nuevo botón de logout
      document.getElementById('btn-logout-page').addEventListener('click', () => {
        signOut(auth).then(() => {
          window.location.reload(); // Recargamos para que se muestre el form de login
        });
      });

    } else {
      // --- USUARIO NO ESTÁ LOGUEADO ---
      // El usuario está deslogueado, así que buscamos el form y 
      // le agregamos los listeners para que PUEDA loguearse.
      
      const formLogin = document.getElementById('form-login'); 
      const btnGoogle = document.getElementById('btn-google-login'); 
      const errorDiv = document.getElementById('login-error');

      if (formLogin) {
        formLogin.addEventListener('submit', async (e) => {
          e.preventDefault();
          const email = document.getElementById('login-email').value;
          const password = document.getElementById('login-password').value;
          if (errorDiv) errorDiv.classList.add('hidden');
          try {
            await signInWithEmailAndPassword(auth, email, password);
            window.location.href = '../index.html';
          } catch (error) {
            if (errorDiv) {
              errorDiv.textContent = "Correo o contraseña incorrectos.";
              errorDiv.classList.remove('hidden');
            }
          }
        });
      }

      if (btnGoogle) {
        btnGoogle.addEventListener('click', async () => {
          try {
            await signInWithPopup(auth, googleProvider);
            window.location.href = '../index.html';
          } catch (error) {
            console.error("Error con Google Sign-In:", error);
          }
        });
      }
    }
  });
}