
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { auth } from './firebase.js';

// 1. Exportamos la función que 'main.js' va a llamar
export function inicializarPerfil() {
  
  // 2. Buscamos el contenedor
  const perfilContainer = document.getElementById('perfil-container');
  
  // 3. Si no es la página de perfil, no hace nada.
  if (!perfilContainer) return; 

  // 4. Revisamos el estado de autenticación
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // --- USUARIO ESTÁ LOGUEADO ---
      
      const displayName = user.displayName || user.email.split('@')[0];
      const email = user.email;
      const photoURL = user.photoURL;

      // --- HTML DEL PERFIL ---
      perfilContainer.innerHTML = `
        <div class="flex flex-col lg:flex-row items-center">
          ${photoURL 
            ? `<img src="${photoURL}" alt="${displayName}" class="h-24 w-24 rounded-full border-4 border-blue-600 mb-4 lg:mb-0 lg:mr-6">`
            : `<div class="h-24 w-24 rounded-full bg-blue-600 text-white flex items-center justify-center text-4xl font-bold mb-4 lg:mb-0 lg:mr-6">${displayName ? displayName[0].toUpperCase() : '?'}</div>`
          }
          
          <div>
            <h1 class="text-3xl font-bold text-gray-900">¡Hola, ${displayName}!</h1>
            <p class="text-lg text-gray-600 mt-1">${email}</p>
          </div>
        </div>

        <hr class="my-8">

        <h2 class="text-xl font-semibold mb-4 text-gray-800">Administrar tu cuenta</h2>
        
                <div class="flex flex-col sm:flex-row sm:items-center gap-4"> 
          
          <button id="btn-volver-inicio" class="w-full sm:w-auto bg-blue-600 text-white py-2 px-5 rounded-lg hover:bg-blue-700 transition">
            Volver al inicio
          </button>
          
          <button id="btn-logout" class="w-full sm:w-auto bg-red-600 text-white py-2 px-5 rounded-lg hover:bg-red-700 transition">
         Cerrar Sesión
          </button>
        </div>
        
        <div id="perfil-mensaje" class="mt-4 text-green-600"></div>
      `;

      // 5. Agregamos listeners a los nuevos botones
      
      // --- LISTENER "VOLVER AL INICIO" ---
      document.getElementById('btn-volver-inicio').addEventListener('click', () => {
         window.location.href = '../index.html'; 
      });

      // --- LISTENER "CERRAR SESIÓN" ---
      document.getElementById('btn-logout').addEventListener('click', () => {
        signOut(auth).then(() => {
          window.location.href = '../index.html'; // Redirigir al inicio
        });
      });

    } else {
      // --- USUARIO NO ESTÁ LOGUEADO ---
      window.location.href = './login.html'; 
    }
  });
}