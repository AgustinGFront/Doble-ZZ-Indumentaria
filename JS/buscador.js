// js/buscador.js

export function inicializarBuscador() {
  
  const lupa_boton = document.querySelector(".btn-lupa");
  const buscador_input = document.querySelector(".Buscador");
  
  if (!buscador_input) {
    return; // No hay buscador en esta página
  }

  // ============================================
  // DETECTAR SI ESTAMOS EN PRODUCTOS.HTML
  // ============================================
  const esPaginaProductos = document.querySelector(".flex-1 .bg-white.border.rounded-lg") !== null;
  
  if (esPaginaProductos) {
    // ============================================
    // LÓGICA PARA PRODUCTOS.HTML (búsqueda local)
    // ============================================
    const todosLosProductos = document.querySelectorAll(".flex-1 .bg-white.border.rounded-lg");

    // Botón lupa en mobile
    if (lupa_boton) {
      lupa_boton.addEventListener("click", () => {
        buscador_input.classList.toggle("hidden");
        buscador_input.classList.toggle("sm:block");
        buscador_input.focus();
      });
    }

    // Escuchar el input del usuario
    buscador_input.addEventListener("input", (e) => {
      const textoBusqueda = e.target.value.toLowerCase().trim();
      buscarProductos(textoBusqueda);
    });

    // También buscar al presionar Enter
    buscador_input.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        const textoBusqueda = e.target.value.toLowerCase().trim();
        buscarProductos(textoBusqueda);
      }
    });

    // Función de búsqueda LOCAL
    function buscarProductos(texto) {
      let productosEncontrados = 0;
      const mensajePrevio = document.querySelector("#mensaje-no-encontrado");
      if (mensajePrevio) mensajePrevio.remove();

      if (texto === "") {
        todosLosProductos.forEach(producto => {
          producto.style.display = "";
        });
        return;
      }

      todosLosProductos.forEach(producto => {
        const nombreProducto = producto.querySelector("h3").textContent.toLowerCase();
        if (nombreProducto.includes(texto)) {
          producto.style.display = "";
          productosEncontrados++;
        } else {
          producto.style.display = "none";
        }
      });

      if (productosEncontrados === 0) {
        mostrarMensajeNoEncontrado(texto);
      }
    }

    // Mostrar mensaje de "no encontrado"
    function mostrarMensajeNoEncontrado(textoBusqueda) {
      const contenedorGrid = document.querySelector(".grid.grid-cols-1");
      if (!contenedorGrid) return;

      const mensaje = document.createElement("div");
      mensaje.id = "mensaje-no-encontrado";
      mensaje.className = "col-span-full text-center py-12 px-4";
      mensaje.innerHTML = `
        <div class="max-w-md mx-auto">
          <svg class="mx-auto h-16 w-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
          <h3 class="text-2xl font-bold text-gray-700 mb-2">No se encontraron productos</h3>
          <p class="text-gray-500 mb-4">No hay productos que coincidan con "<span class="font-semibold">${textoBusqueda}</span>"</p>
          <button onclick="limpiarBusqueda()" class="px-6 py-2 bg-blue-800/50 text-white rounded-lg hover:bg-blue-700 transition">
            Ver todos los productos
          </button>
        </div>
      `;
      
      contenedorGrid.insertBefore(mensaje, contenedorGrid.firstChild);
    }

    // Función para limpiar
    function limpiarBusqueda() {
      buscador_input.value = "";
      buscarProductos("");
      
      // Limpiar URL también
      const url = new URL(window.location);
      url.searchParams.delete('search');
      window.history.replaceState({}, '', url);
    }
    
    window.limpiarBusqueda = limpiarBusqueda;

    // ============================================
    // CARGAR BÚSQUEDA DESDE URL (si existe)
    // ============================================
    const params = new URLSearchParams(window.location.search);
    const searchTerm = params.get('search');

    if (searchTerm) {
      buscador_input.value = searchTerm;
      buscarProductos(searchTerm);
    }

  } else {
    // ============================================
    // LÓGICA PARA OTRAS PÁGINAS (redirección)
    // ============================================
    
    // Función para redirigir a productos.html con búsqueda
    function redirigirAProductos(textoBusqueda) {
      if (!textoBusqueda || textoBusqueda.trim() === "") {
        // Si está vacío, solo ir a productos sin búsqueda
        window.location.href = "./pages/productos.html";
        return;
      }

      // Detectar si estamos en el index o en una subcarpeta
      const enIndex = window.location.pathname.endsWith('index.html') || 
                      window.location.pathname.endsWith('/') ||
                      !window.location.pathname.includes('/pages/');
      
      const rutaProductos = enIndex ? "./pages/productos.html" : "./productos.html";
      
      // Redirigir con el parámetro de búsqueda
      window.location.href = `${rutaProductos}?search=${encodeURIComponent(textoBusqueda)}`;
    }

    // Event listener para el input (Enter)
    buscador_input.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        const textoBusqueda = e.target.value.trim();
        redirigirAProductos(textoBusqueda);
      }
    });

    // Event listener para el botón de lupa
    if (lupa_boton) {
      lupa_boton.addEventListener("click", () => {
        // En mobile, primero mostrar el input
        if (buscador_input.classList.contains("hidden")) {
          buscador_input.classList.remove("hidden");
          buscador_input.classList.add("block");
          buscador_input.focus();
        } else {
          // Si ya está visible, hacer la búsqueda
          const textoBusqueda = buscador_input.value.trim();
          if (textoBusqueda) {
            redirigirAProductos(textoBusqueda);
          }
        }
      });
    }
  }
}