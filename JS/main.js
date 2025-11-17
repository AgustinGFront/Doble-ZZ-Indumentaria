// js/main.js

// --- 1. IMPORTACIONES ---
import { configurarBotonPerfil } from './auth.js';
import { inicializarBuscador } from './buscador.js';
import { inicializarCarrito } from './carrito.js';
import { inicializarFiltros } from './filtros.js';
import { inicializarContacto } from './contacto.js';
import { inicializarRegistro } from './registro.js';
import { inicializarTabs } from './tabs.js';

// --- 2. EJECUCIÓN PRINCIPAL ---
document.addEventListener('DOMContentLoaded', () => {
  
  // --- Inicializa todos los módulos ---
  configurarBotonPerfil();
  inicializarBuscador(); // <-- Ahora esto tiene el control total de la lupa
  inicializarCarrito();
  inicializarFiltros();
  inicializarContacto();
  inicializarRegistro();
  inicializarTabs();
  
  // --- Lógica del Menú Móvil (Botón Hamburguesa) ---
  const mobileMenuButton = document.querySelector('[aria-controls="mobile-menu"]');
  const mobileMenu = document.getElementById('mobile-menu');
  const iconMenu = document.querySelector('.icon-menu');
  const iconClose = document.querySelector('.icon-close');

  if (mobileMenuButton && mobileMenu && iconMenu && iconClose) {
    mobileMenuButton.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
      iconMenu.classList.toggle('hidden');
      iconClose.classList.toggle('hidden');
    });
  }

}); // <-- Se cierra el 'DOMContentLoaded'