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
  inicializarBuscador();
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

 // --- Lógica de Búsqueda Global (Lupa del Header) ---
const lupaBotonHeader = document.querySelector('.btn-lupa');
const buscadorInputHeader = document.querySelector('.Buscador');

if (lupaBotonHeader && buscadorInputHeader) {

  // Función para realizar la búsqueda
  function realizarBusqueda() {
    const texto = buscadorInputHeader.value.trim();
    if (texto) {
      const isInIndex = window.location.pathname === '/' || window.location.pathname.includes('index.html');
      const ruta = isInIndex ? './pages/productos.html' : '/pages/productos.html';
      window.location.href = `${ruta}?search=${encodeURIComponent(texto)}`;
    }
  }

  // Función para saber si estamos en desktop (1024px o más)
  function isDesktop() {
    return window.innerWidth >= 1024;
  }

  // Función para establecer el estado inicial del buscador
  function establecerEstadoInicial() {
    if (isDesktop()) {
      buscadorInputHeader.classList.remove('hidden', 'block');
    } else {
      if (!buscadorInputHeader.classList.contains('hidden')) {
        buscadorInputHeader.classList.add('hidden');
      }
      buscadorInputHeader.classList.remove('block');
    }
  }

  // 1. Lógica para el clic en la LUPA
  lupaBotonHeader.addEventListener('click', (e) => {
    e.preventDefault();
    
    if (isDesktop()) {
      // En desktop (1024px+), la barra está visible, solo buscamos
      realizarBusqueda();
    } else {
      // En móvil/tablet (menos de 1024px), alternamos el input
      const estaOculto = buscadorInputHeader.classList.contains('hidden') || 
                        window.getComputedStyle(buscadorInputHeader).display === 'none';
      
      if (estaOculto) {
        // Mostrar input
        buscadorInputHeader.classList.remove('hidden');
        buscadorInputHeader.classList.add('block');
        setTimeout(() => buscadorInputHeader.focus(), 100);
      } else if (buscadorInputHeader.value.trim() !== '') {
        // Si tiene texto, buscar
        realizarBusqueda();
      } else {
        // Si está vacío, ocultar
        buscadorInputHeader.classList.add('hidden');
        buscadorInputHeader.classList.remove('block');
      }
    }
  });

  // 2. Buscar con "Enter"
  buscadorInputHeader.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      realizarBusqueda();
    }
  });

  // 3. Cerrar si se hace clic fuera (solo móvil/tablet)
  document.addEventListener('click', (e) => {
    if (!isDesktop()) {
      if (!buscadorInputHeader.contains(e.target) && 
          !lupaBotonHeader.contains(e.target) &&
          buscadorInputHeader.classList.contains('block')) {
        buscadorInputHeader.classList.add('hidden');
        buscadorInputHeader.classList.remove('block');
      }
    }
  });

  // 4. Reajustar al cambiar tamaño de ventana
  window.addEventListener('resize', () => {
    establecerEstadoInicial();
  });

  // 5. Estado inicial al cargar
  establecerEstadoInicial();
  window.addEventListener('load', establecerEstadoInicial);
}});