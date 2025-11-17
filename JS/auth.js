
import { auth } from './firebase.js';
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
// Función para redirigir a login.html
export function redirigirALogin() {
  // Determinar la ruta correcta a login.html
  const currentPath = window.location.pathname;
  const currentUrl = window.location.href;
  
  let loginPath;
  if (currentPath.includes('/pages/') || currentUrl.includes('/pages/')) {
    // Si estamos en la carpeta pages, login.html está en la misma carpeta
    loginPath = './login.html';
  } else {
    // Si estamos en la raíz, login.html está en pages/
    loginPath = './pages/login.html';
  }
  
  window.location.href = loginPath;
  return false; // Prevenir cualquier comportamiento por defecto
}

// Múltiples métodos para asegurar que funcione
//
document.addEventListener('click', (e) => {
  const btnPerfil = e.target.closest('.btn-perfil');
  if (btnPerfil) {
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
    redirigirALogin();
    return false;
  }
}, true); // Usar capture phase para interceptar antes que otros listeners

// 
function agregarListenerDirecto() {
  const btnPerfil = document.querySelector('.btn-perfil');
  if (btnPerfil) {
    // Remover listeners anteriores si existen
    const nuevoBtn = btnPerfil.cloneNode(true);
    btnPerfil.parentNode.replaceChild(nuevoBtn, btnPerfil);
    
    // Agregar el listener al nuevo botón
    nuevoBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      redirigirALogin();
      return false;
    });
  }
}

// Función para configurar el botón de perfil
export  function configurarBotonPerfil() {
  const btnPerfil = document.querySelector('.btn-perfil');
  
  if (!btnPerfil) {
    // Intentar de nuevo después de un breve delay
    setTimeout(configurarBotonPerfil, 100);
    return;
  }
  
  let currentUser = null;

  // Listen to auth state changes
  onAuthStateChanged(auth, (user) => {
    currentUser = user;
    
    if (user) {
      btnPerfil.innerHTML = `
        <span class="sr-only">Perfil</span>
        <img src="${user.photoURL}" alt="${user.displayName}" class="h-6 w-6 rounded-full object-cover border-2 border-white" />
      `;
    } else {
      btnPerfil.innerHTML = `
        <span class="sr-only">Perfil</span>
        <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
        </svg>
      `;
    }
    
    // Re-agregar el listener después de modificar el HTML
    setTimeout(() => {
      agregarListenerDirecto();
    }, 100);
  });
}

