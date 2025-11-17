
// --- VARIABLES GLOBALES (solo para este módulo) ---s
let carrito = [];
const KEY_LOCALSTORAGE = 'carritoDeCompras';


export function inicializarCarrito() {

  // --- SELECTORES DEL DOM ---
  const btnVerCarrito = document.getElementById('btn-ver-carrito');
  const btnCerrarCarrito = document.getElementById('btn-cerrar-carrito');
  const modalCarrito = document.getElementById('modal-carrito');
  const listaCarrito = document.getElementById('lista-carrito');
  const totalCarrito = document.getElementById('total-carrito');
  const cantidadCarrito = document.getElementById('cantidad-carrito');

  // --- "IF GUARD" ---
  // Si no está el botón del carrito, no estamos en la página de la tienda.
  if (!btnVerCarrito) {
    return; // No hacer nada
  }

  // LÓGICA DEL CARRITO  ---

  function agregarAlCarrito(e) {
    e.preventDefault();
    const boton = e.target;
    
    const producto = {
        id: boton.dataset.id,
        nombre: boton.dataset.nombre,
        precio: parseFloat(boton.dataset.precio),
        cantidad: 1,
        imagen: boton.dataset.imagen,
    };
    
    const productoExistente = carrito.find(item => item.id === producto.id);
    
    if (productoExistente) {
        // Si ya existe, solo suma la cantidad
        productoExistente.cantidad++;
    } else {
        // Si es nuevo, lo agrega al carrito
        carrito.push(producto);
    }
    
    renderizarCarrito();
    guardarCarritoEnStorage();
    mostrarModalCarrito();
  }

  // 
  function renderizarCarrito() {
    if (!listaCarrito) {
        return; 
    }
    listaCarrito.innerHTML = ''; // Limpiamos la lista
    
    let totalGeneral = 0;
    let cantidadTotal = 0;
    
    if (carrito.length === 0) {
        // 1. Si el carrito está vacío, mostramos el mensaje
        const liVacio = document.createElement('li');
        liVacio.className = 'text-center text-gray-500 py-8';
        liVacio.textContent = 'No hay nada en el carrito.';
        listaCarrito.appendChild(liVacio);

    } else {
        // 2. Si hay items, los recorremos 
        carrito.forEach(item => {
            const subtotal = item.precio * item.cantidad;
            totalGeneral += subtotal; // <-- CÁLCULO TOTAL CORREGIDO
            cantidadTotal += item.cantidad;
            
            const li = document.createElement('li');
            li.className = 'flex items-center space-x-4 py-4 border-b';
            
            // HTML CORREGIDO PARA MOSTRAR CANTIDAD ABAJO
            li.innerHTML = `
                <img src="${item.imagen}" alt="${item.nombre}" class="w-16 h-16 object-cover rounded-md border">
                
                <div class="flex-1 min-w-0">
                    <span class="block text-gray-800 font-semibold truncate">${item.nombre}</span>
                    <span class="block text-gray-500 text-sm">(x${item.cantidad})</span>
                    <span class="block text-gray-600 font-medium">$${subtotal.toFixed(2)}</span>
                </div>

                <button class="btn-eliminar-item text-red-500 hover:text-red-700 flex-shrink-0" data-id="${item.id}">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"></path>
                    </svg>
                </button>
            `;

            listaCarrito.appendChild(li);
        });
    }
    
    // 3. Actualizamos los totales en el HTML
    totalCarrito.textContent = `$${totalGeneral.toFixed(2)}`;
    cantidadCarrito.textContent = cantidadTotal;
    
    // 4. Mostramos u ocultamos la "burbuja"
    if (cantidadTotal > 0) {
        cantidadCarrito.classList.remove('hidden');
    } else {
        cantidadCarrito.classList.add('hidden');
    }
  }

  function eliminarItemDelCarrito(e) {
    if (!e.target.closest('.btn-eliminar-item')) { // Usamos .closest para el SVG
        return;
    }
    
    const idItem = e.target.closest('.btn-eliminar-item').dataset.id;
    
    carrito = carrito.filter(item => item.id !== idItem);
    
    renderizarCarrito();
    guardarCarritoEnStorage();
  }

  // LOCALSTORAGE  ---

  function guardarCarritoEnStorage() {
    localStorage.setItem(KEY_LOCALSTORAGE, JSON.stringify(carrito));
  }

  function cargarCarritoDesdeStorage() {
    const carritoGuardado = localStorage.getItem(KEY_LOCALSTORAGE);
    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
    }
  }

  // MANEJO DE EVENTOS  ---

  function enlazarBotonesAgregar() {
    const botonesAgregar = document.querySelectorAll('.btn-agregar'); 
    
    if (botonesAgregar.length === 0) {
        // reintentamos después de un momento.
        setTimeout(enlazarBotonesAgregar, 500);
        return;
    }
    
    botonesAgregar.forEach(boton => {
        boton.addEventListener('click', agregarAlCarrito);
    });
  }

  function enlazarEventosInterfaz() {
    btnVerCarrito.addEventListener('click', mostrarModalCarrito);
    btnCerrarCarrito.addEventListener('click', ocultarModalCarrito);
    listaCarrito.addEventListener('click', eliminarItemDelCarrito);
  }

  // FUNCIONES DEL MODAL  ---

  function mostrarModalCarrito() {
    modalCarrito.classList.remove('hidden');
  }

  function ocultarModalCarrito() {
    modalCarrito.classList.add('hidden');
  }

  //  INICIAR LA APLICACIÓN 
  
  cargarCarritoDesdeStorage();
  renderizarCarrito();
  enlazarBotonesAgregar();
  enlazarEventosInterfaz();

} 