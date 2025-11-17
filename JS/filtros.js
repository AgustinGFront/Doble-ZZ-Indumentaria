 //Importamos el array de productos
import { productos } from './productos.js';
export function inicializarFiltros() {

  // SELECTORES DESKTOP
  const checksTalles = document.querySelectorAll('.filtro-talle');
  const checksEstilos = document.querySelectorAll('.filtro-estilo');
  const sliderPrecio = document.getElementById('precio-slider');
  const valorPrecio = document.getElementById('precio-valor');

  // SELECTORES MOBILE
  const btnAbrirFiltrosMobile = document.getElementById('btn-abrir-filtros-mobile');
  const btnCerrarFiltrosMobile = document.getElementById('btn-cerrar-filtros-mobile');
  const btnAplicarFiltrosMobile = document.getElementById('btn-aplicar-filtros-mobile');
  const btnLimpiarFiltrosMobile = document.getElementById('btn-limpiar-filtros-mobile');
  const modalFiltrosMobile = document.getElementById('modal-filtros-mobile');
  const overlayFiltros = document.getElementById('overlay-filtros');
  const contadorFiltrosActivos = document.getElementById('contador-filtros-activos');

  const checksTallesMobile = document.querySelectorAll('.filtro-talle-mobile');
  const checksEstilosMobile = document.querySelectorAll('.filtro-estilo-mobile');
  const sliderPrecioMobile = document.getElementById('precio-slider-mobile');
  const valorPrecioMobile = document.getElementById('precio-valor-mobile');


  // GUARD CLAUSE

  if (!sliderPrecio && !sliderPrecioMobile) {
    return; // No estamos en la página de productos
  }

  // Buscamos TODAS las tarjetas de productos en el HTML
  const todasLasTarjetas = document.querySelectorAll('.flex-1 .bg-white.border.rounded-lg');


  // FUNCIONES DE FILTRADO



   // Función principal que se ejecuta CADA VEZ que un filtro cambia
 
  function aplicarFiltros() {
    // 1. OBTENER VALORES DE LOS FILTROS (siempre desde desktop)
    const tallesSeleccionados = Array.from(checksTalles)
      .filter(check => check.checked)
      .map(check => check.value);

    const estilosSeleccionados = Array.from(checksEstilos)
      .filter(check => check.checked)
      .map(check => check.value);
    
    const precioMaximo = sliderPrecio ? parseFloat(sliderPrecio.value) : 20000;

    // 2. RECORRER CADA TARJETA DE PRODUCTO Y DECIDIR SI MOSTRARLA
    todasLasTarjetas.forEach(tarjeta => {
      const boton = tarjeta.querySelector('.btn-agregar');
      if (!boton || !boton.dataset.id) {
        tarjeta.style.display = 'none';
        return;
      }
      
      const idProducto = boton.dataset.id;
      
      // Buscar la "data" de este producto en nuestro array 'productos'
      const dataProducto = productos.find(p => p.id == idProducto);

      if (!dataProducto) {
        tarjeta.style.display = 'none';
        return; 
      }

      // LÓGICA DE FILTROS
      const pasaPrecio = dataProducto.precio <= precioMaximo;
      
      let pasaTalles = true;
      if (tallesSeleccionados.length > 0) {
        const tallesProducto = dataProducto.talles.split(',');
        pasaTalles = tallesSeleccionados.some(talle => tallesProducto.includes(talle));
      }
      
      let pasaEstilos = true;
      if (estilosSeleccionados.length > 0) {
        const estiloProducto = dataProducto.estilo || "Manga Corta"; 
        pasaEstilos = estilosSeleccionados.includes(estiloProducto);
      }

      // DECISIÓN FINAL
      if (pasaPrecio && pasaTalles && pasaEstilos) {
        tarjeta.style.display = '';
      } else {
        tarjeta.style.display = 'none';
      }
    });

    // Actualizar contador de filtros activos
    actualizarContadorFiltros();
  }

  /**
   * Limpiar todos los filtros desktop
   */
  function limpiarFiltros() {
    checksTalles.forEach(check => check.checked = false);
    checksEstilos.forEach(check => check.checked = false);
    
    if (sliderPrecio) {
      sliderPrecio.value = sliderPrecio.max;
      valorPrecio.textContent = `$${parseFloat(sliderPrecio.max).toLocaleString('es-ES')}`;
    }
    
    aplicarFiltros();
  }


  // FUNCIONES MOBILE


  /**
   * Sincronizar filtros mobile con desktop (al abrir el modal)
   */
  function sincronizarFiltros() {
    // Sincronizar talles
    checksTallesMobile.forEach(checkMobile => {
      const checkDesktop = Array.from(checksTalles).find(c => c.value === checkMobile.value);
      if (checkDesktop) {
        checkMobile.checked = checkDesktop.checked;
      }
    });

    // Sincronizar estilos
    checksEstilosMobile.forEach(checkMobile => {
      const checkDesktop = Array.from(checksEstilos).find(c => c.value === checkMobile.value);
      if (checkDesktop) {
        checkMobile.checked = checkDesktop.checked;
      }
    });

    // Sincronizar precio
    if (sliderPrecio && sliderPrecioMobile) {
      sliderPrecioMobile.value = sliderPrecio.value;
      valorPrecioMobile.textContent = valorPrecio.textContent;
    }
  }

  /**
   * Aplicar filtros mobile (copiar valores de mobile a desktop)
   */
  function aplicarFiltrosMobile() {
    // Copiar valores de mobile a desktop
    checksTalles.forEach(checkDesktop => {
      const checkMobile = Array.from(checksTallesMobile).find(c => c.value === checkDesktop.value);
      if (checkMobile) {
        checkDesktop.checked = checkMobile.checked;
      }
    });

    checksEstilos.forEach(checkDesktop => {
      const checkMobile = Array.from(checksEstilosMobile).find(c => c.value === checkDesktop.value);
      if (checkMobile) {
        checkDesktop.checked = checkMobile.checked;
      }
    });

    if (sliderPrecio && sliderPrecioMobile) {
      sliderPrecio.value = sliderPrecioMobile.value;
      valorPrecio.textContent = valorPrecioMobile.textContent;
    }

    // Aplicar filtros y cerrar modal
    aplicarFiltros();
    cerrarModalFiltros();
  }

  /**
   * Limpiar filtros mobile
   */
  function limpiarFiltrosMobile() {
    checksTallesMobile.forEach(check => check.checked = false);
    checksEstilosMobile.forEach(check => check.checked = false);
    
    if (sliderPrecioMobile) {
      sliderPrecioMobile.value = sliderPrecioMobile.max;
      valorPrecioMobile.textContent = `$${parseFloat(sliderPrecioMobile.max).toLocaleString('es-ES')}`;
    }
  }

  /**
   * Abrir modal de filtros mobile
   */
  function abrirModalFiltros() {
    sincronizarFiltros();
    if (modalFiltrosMobile) {
      modalFiltrosMobile.classList.remove('hidden');
      document.body.style.overflow = 'hidden'; // Bloquear scroll del body
    }
  }

  /**
   * Cerrar modal de filtros mobile
   */
  function cerrarModalFiltros() {
    if (modalFiltrosMobile) {
      modalFiltrosMobile.classList.add('hidden');
      document.body.style.overflow = ''; // Restaurar scroll del body
    }
  }

  /**
   * Actualizar contador de filtros activos en el botón flotante
   */
  function actualizarContadorFiltros() {
    if (!contadorFiltrosActivos) return;

    const tallesActivos = Array.from(checksTalles).filter(c => c.checked).length;
    const estilosActivos = Array.from(checksEstilos).filter(c => c.checked).length;
    const precioModificado = sliderPrecio && parseFloat(sliderPrecio.value) < parseFloat(sliderPrecio.max) ? 1 : 0;
    
    const totalFiltros = tallesActivos + estilosActivos + precioModificado;
    
    if (totalFiltros > 0) {
      contadorFiltrosActivos.textContent = totalFiltros;
      contadorFiltrosActivos.classList.remove('hidden');
    } else {
      contadorFiltrosActivos.classList.add('hidden');
    }
  }


  // EVENT LISTENERS DESKTOP


  // Oyente para cada checkbox de talle
  checksTalles.forEach(check => {
    check.addEventListener('change', aplicarFiltros);
  });

  // Oyente para cada checkbox de estilo
  checksEstilos.forEach(check => {
    check.addEventListener('change', aplicarFiltros);
  });

  // Oyente para el slider de precio
  if (sliderPrecio) {
    sliderPrecio.addEventListener('input', (e) => {
      const valorFormateado = parseFloat(e.target.value).toLocaleString('es-ES');
      valorPrecio.textContent = `$${valorFormateado}`;
      aplicarFiltros();
    });
  }


  // EVENT LISTENERS MOBILE


  if (btnAbrirFiltrosMobile) {
    btnAbrirFiltrosMobile.addEventListener('click', abrirModalFiltros);
  }

  if (btnCerrarFiltrosMobile) {
    btnCerrarFiltrosMobile.addEventListener('click', cerrarModalFiltros);
  }

  if (overlayFiltros) {
    overlayFiltros.addEventListener('click', cerrarModalFiltros);
  }

  if (btnAplicarFiltrosMobile) {
    btnAplicarFiltrosMobile.addEventListener('click', aplicarFiltrosMobile);
  }

  if (btnLimpiarFiltrosMobile) {
    btnLimpiarFiltrosMobile.addEventListener('click', limpiarFiltrosMobile);
  }

  if (sliderPrecioMobile) {
    sliderPrecioMobile.addEventListener('input', (e) => {
      const valorFormateado = parseFloat(e.target.value).toLocaleString('es-ES');
      valorPrecioMobile.textContent = `$${valorFormateado}`;
    });
  }


  // Hacer la función 'limpiarFiltros' global para el botón onclick del HTML
  window.limpiarFiltros = limpiarFiltros;


  actualizarContadorFiltros();

}