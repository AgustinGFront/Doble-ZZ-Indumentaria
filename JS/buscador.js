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
    
    // NUEVO: Seleccionamos los títulos y líneas de sección
    const titulosSeccion = document.querySelectorAll(".flex-1 > h5");
    const lineasSeccion = document.querySelectorAll(".flex-1 > hr");

    // Botón lupa en mobile
    if (lupa_boton) {
      lupa_boton.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        const isMobile = window.innerWidth < 1024;
        
        if (isMobile) {
          const tieneClassBlock = buscador_input.classList.contains("block");
          
          if (!tieneClassBlock) {
            // Mostrar buscador
            buscador_input.classList.remove("hidden");
            buscador_input.classList.add("block");
            document.body.classList.add("search-active");
            lupa_boton.classList.add("active");
            
            setTimeout(() => {
              buscador_input.focus();
            }, 150);
          } else {
            // Ocultar buscador
            buscador_input.classList.remove("block");
            buscador_input.classList.add("hidden");
            document.body.classList.remove("search-active");
            lupa_boton.classList.remove("active");
          }
        } else {
          // En desktop, solo hacer focus
          buscador_input.focus();
        }
      });
    }

    // Cerrar buscador al hacer click fuera (solo mobile)
    document.addEventListener("click", (e) => {
      const isMobile = window.innerWidth < 1024;
      
      if (isMobile && buscador_input.classList.contains("block")) {
        if (!buscador_input.contains(e.target) && !lupa_boton.contains(e.target)) {
          buscador_input.classList.remove("block");
          buscador_input.classList.add("hidden");
          document.body.classList.remove("search-active");
          lupa_boton.classList.remove("active");
        }
      }
    });

    // Prevenir que el buscador se cierre al hacer click en él
    buscador_input.addEventListener("click", (e) => {
      e.stopPropagation();
    });

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

    // Función de búsqueda LOCAL (Modificada)
    function buscarProductos(texto) {
      let productosEncontrados = 0;
      const mensajePrevio = document.querySelector("#mensaje-no-encontrado");
      if (mensajePrevio) mensajePrevio.remove();

      if (texto === "") {
        // MODO RESET: Si no hay búsqueda, mostrar todo
        todosLosProductos.forEach(producto => {
          producto.style.display = "";
        });
        // NUEVO: Mostrar títulos y líneas
        titulosSeccion.forEach(titulo => titulo.style.display = "");
        lineasSeccion.forEach(linea => linea.style.display = "");
        return;
      }

      // MODO BÚSQUEDA: Si hay texto, ocultar títulos y líneas
      // NUEVO: Ocultar títulos y líneas
      titulosSeccion.forEach(titulo => titulo.style.display = "none");
      lineasSeccion.forEach(linea => linea.style.display = "none");

      // Ahora filtramos los productos
      todosLosProductos.forEach(producto => {
        const nombreProducto = producto.querySelector("h3").textContent.toLowerCase();
        if (nombreProducto.includes(texto)) {
          producto.style.display = ""; // Mostrar producto
          productosEncontrados++;
         } else {
          producto.style.display = "none"; // Ocultar producto
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
    IA     <button onclick="limpiarBusqueda()" class="px-6 py-2 bg-blue-800/50 text-white rounded-lg hover:bg-blue-700 transition">
            Ver todos los productos
          </button>
        </div>
      `;
      
      // NUEVO: Insertar el mensaje después del primer grid, no antes (para que no lo oculte la lógica de títulos)
      contenedorGrid.insertAdjacentElement('afterend', mensaje);
    }

    // Función para limpiar
    function limpiarBusqueda() {
      buscador_input.value = "";
      buscarProductos(""); // Esto activará el modo RESET
      
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
      buscarProductos(searchTerm); // Esto activará el MODO BÚSQUEDA al cargar
    }

  } else {
    // ============================================
    // LÓGICA PARA OTRAS PÁGINAS (redirección)
    // ============================================
    
    function redirigirAProductos(textoBusqueda) {
      if (!textoBusqueda || textoBusqueda.trim() === "") {
        window.location.href = "./pages/productos.html";
        return;
      }

      const enIndex = window.location.pathname.endsWith('index.html') || 
                      window.location.pathname.endsWith('/') ||
                      !window.location.pathname.includes('/pages/');
      
      const rutaProductos = enIndex ? "./pages/productos.html" : "./productos.html";
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
      lupa_boton.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        const isMobile = window.innerWidth < 1024;
     
        if (isMobile) {
          const tieneClassBlock = buscador_input.classList.contains("block");
          
          if (!tieneClassBlock) {
            // Mostrar el input
            buscador_input.classList.remove("hidden");
            buscador_input.classList.add("block");
            document.body.classList.add("search-active");
            lupa_boton.classList.add("active");
            
            setTimeout(() => {
              buscador_input.focus();
            }, 150);
          } else {
            // Si ya está visible, hacer la búsqueda
         const textoBusqueda = buscador_input.value.trim();
            if (textoBusqueda) {
              redirigirAProductos(textoBusqueda);
            }
          }
        } else {
          // En desktop, hacer la búsqueda directamente
          const textoBusqueda = buscador_input.value.trim();
          redirigirAProductos(textoBusqueda);
        }
      });
    }

    // Cerrar buscador al hacer click fuera
    document.addEventListener("click", (e) => {
      const isMobile = window.innerWidth < 1024;
      
      if (isMobile && buscador_input.classList.contains("block")) {
        if (!buscador_input.contains(e.target) && !lupa_boton.contains(e.target)) {
          buscador_input.classList.remove("block");
          buscador_input.classList.add("hidden");
          document.body.classList.remove("search-active");
          lupa_boton.classList.remove("active");
        }
      }
    });

    // Prevenir que el buscador se cierre al hacer click en él
    buscador_input.addEventListener("click", (e) => {
      e.stopPropagation();
    });
  }
}