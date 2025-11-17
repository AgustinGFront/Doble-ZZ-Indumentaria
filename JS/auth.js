
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { auth } from './firebase.js'; 

export function configurarBotonPerfil() {
  const btnPerfil = document.querySelector('.btn-perfil');
  if (!btnPerfil) return;

  onAuthStateChanged(auth, (user) => {
    
    // Determina la ruta 
    const enIndex = window.location.pathname === '/' || window.location.pathname.includes('index.html');

    if (user) {
      //  Usuario ESTÁ logueado 
      const displayName = user.displayName || user.email.split('@')[0];
      const photoURL = user.photoURL;

      // Muestra saludo y foto
      btnPerfil.innerHTML = `
        ${photoURL 
          ? `<img src="${photoURL}" alt="${displayName}" class="h-6 w-6 rounded-full border border-white lg:hidden">`
          : `<span class="h-6 w-6 rounded-full bg-blue-800 text-white text-xs flex items-center justify-center font-bold lg:hidden">${displayName ? displayName[0].toUpperCase() : '?'}</span>`
        }
        <span class="hidden lg:flex items-center text-sm font-medium text-white">
          Hola, ${displayName}
        </span>
      `;
      

      //linkea a la página de perfil
      btnPerfil.href = enIndex ? './pages/perfil.html' : './perfil.html';
      btnPerfil.onclick = null; // Quitamos el listener de logout

    } else {
      // Usuario NO está logueado 
      
      // Muestra ícono de perfil
      btnPerfil.innerHTML = `
        <span class="sr-only">Perfil</span>
        <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
        </svg>
      `;
      
      // Link a LOGIN
      btnPerfil.href = enIndex ? './pages/login.html' : './login.html';
      btnPerfil.onclick = null;
    }
  });
}