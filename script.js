// Firebase imports - usando CDN de Google
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBdQbiu0zcaxMEIhf7ght83QVfRZ5wd0W0", 
  authDomain: "doble-zz-3685f.firebaseapp.com",
  projectId: "doble-zz-3685f",
  storageBucket: "doble-zz-3685f.firebasestorage.app",
  messagingSenderId: "1020448708385",
  appId: "1:1020448708385:web:62b5332f7a1c25321ed060",
  measurementId: "G-47JM6X7NQN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// Auth functions
const loginWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    throw error;
  }
};

const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Error al cerrar sesión:', error);
    throw error;
  }
};

// Función para redirigir a login.html
function redirigirALogin() {
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
function configurarBotonPerfil() {
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

// Wait for DOM to load o ejecutar inmediatamente si ya está cargado
if (document.readyState === 'loading') {
  window.addEventListener('DOMContentLoaded', () => {
    configurarBotonPerfil();
    agregarListenerDirecto();
  });
} else {
  // DOM ya está cargado
  configurarBotonPerfil();
  agregarListenerDirecto();
}

// También intentar después de un pequeño delay por si acaso
setTimeout(() => {
  agregarListenerDirecto();
}, 500);

// NOTA: La configuración del botón de Google ahora se maneja directamente en login.html
// Este código se eliminó para evitar conflictos - el botón de Google solo existe en login.html

const productos=[{
    id:1,
    nombre:"Boca juniors Conjunto",
    categoria: "Primera Division",
    precio:14000,
    talles:"M,L,XL,XXL"
    
},
{
    id:2,
    nombre:"Boca Juniors Mangalarga",
    categoria: "Primera Division",
    estilo:"Mangalarga",
    precio:14000,
    talles:"M,L,XL,XXL"
    
},
{
    id:3,
    nombre:"Boca Juniors Conjunto Quilmes",
    categoria: "Primera Division",
    precio:14000,
    talles:"M,L,XL,XXL"
    
},
{
    id:4,
    nombre:"Boca Juniors Mangalarga azul",
    categoria: "Primera Division",
    estilo:"Mangalarga",
    precio:14000,
    talles:"M,L,XL,XXL"
    
},
{
    id:5,
    nombre:"River Mangalarga",
    categoria: "Primera Division",
    estilo:"Mangalarga",
    precio:14000,
    talles:"M,L,XL,XXL"
    
},
{
    id:6,
    nombre:"River Plate Conjunto Alternativo",
    categoria: "Primera Division",
    precio:14000,
    talles:"M,L,XL,XXL"
    
},
{
    id:7,
    nombre:"River Plate Mangalarga blanca",
    categoria: "Primera Division",
    estilo:"Mangalarga",
    precio:14000,
    talles:"M,L,XL,XXL"
    
},
{
    id:8,
    nombre:"River Plate Conjunto Quilmes",
    categoria: "Primera Division",
    precio:14000,
    talles:"M,L,XL,XXL"
    
},
{
    id:9,
    nombre:"Independiente Conjunto",
    categoria: "Primera Division",
    precio:14000,
    talles:"M,L,XL,XXL"
    
},
{
    id:10,
    nombre:"Central Conjunto",
    categoria: "Primera Division",
    precio:14000,
    talles:"M,L,XL,XXL"
    
},
{
    id:11,
    nombre:"Central Alternativo Conjunto",
    categoria: "Primera Division",
    precio:14000,
    talles:"M,L,XL,XXL"
    
},
{
    id:12,
    nombre:"Central Cordoba Conjunto",
    categoria: "Primera Division",
    precio:14000,
    talles:"M,L,XL,XXL"
    
},
{
    id:13,
    nombre:"Central Cordoba Mangalarga",
    categoria: "Primera Division",
    estilo:"Mangalarga",
    precio:14000,
    talles:"M,L,XL,XXL"
    
},
{
    id:14,
    nombre:"Defensa y Justicia Conjunto",
    categoria: "Primera Division",
    precio:14000,
    talles:"M,L,XL,XXL"
    
},
{
    id:15,
    nombre:"Talleres Conjunto",
    categoria: "Primera Division",
    precio:14000,
    talles:"M,L,XL,XXL"
    
}
,
{
    id:16,
    nombre:"Banfield Conjunto",
    categoria: "Primera Division",
    precio:14000,
    talles:"M,L,XL,XXL"
    
},
{
    id:17,
    nombre:"Gimnasia Mangalarga",
    categoria: "Primera Division",
    estilo:"Mangalarga",
    precio:14000,
    talles:"M,L,XL,XXL"
    
}
,

{
    id:18,
    nombre:"Quilmes Conjunto",
    categoria: "Ascenso",
    precio:14000,
    talles:"M,L,XL,XXL"
    
}
,
{
    id:19,
    nombre:"Sacachispas Conjunto",
    categoria: "Ascenso",
    precio:14000,
    talles:"M,L,XL,XXL"
    
}
,
{
    id:20,
    nombre:"Laferrere Conjunto",
    categoria: "Ascenso",
    precio:14000,
    talles:"M,L,XL,XXL"
    
},
{
    id:21,
    nombre:"Laferrere Conjunto Heineiken",
    categoria: "Ascenso",
    precio:14000,
    talles:"M,L,XL,XXL"
    
}
,
{
    id:22,
    nombre:"Central Norte Conjunto",
    categoria: "Ascenso",
    precio:14000,
    talles:"M,L,XL,XXL"
    
}
,
{
    id:23,
    nombre:"Claypole Conjunto",
    categoria: "Ascenso",
    precio:14000,
    talles:"M,L,XL,XXL"
    
}
,
{
    id:24,
    nombre:"Chaco For Ever Mangalarga",
    categoria: "Ascenso",
    estilo:"Mangalarga",
    precio:14000,
    talles:"M,L,XL,XXL"
    
}
,
{
    id:25,
    nombre:"Chacarita Mangalarga",
    categoria: "Ascenso",
    estilo:"Mangalarga",
    precio:14000,
    talles:"M,L,XL,XXL"
    
}
,
{
    id:26,
    nombre:"Quilmes Mangalarga",
    categoria: "Ascenso",
    estilo:"Mangalarga",
    precio:14000,
    talles:"M,L,XL,XXL"
    
}
,
{
    id:27,
    nombre:"Alemania Conjunto Heineiken",
    categoria: "Selecciones",
    precio:14000,
    talles:"M,L,XL,XXL"
    
}
,
{
    id:28,
    nombre:"Alemania Conjunto",
    categoria: "Selecciones",
    precio:14000,
    talles:"M,L,XL,XXL"
    
}
,
{
    id:29,
    nombre:"Argentina Mangalarga",
    categoria: "Selecciones",
    estilo:"Mangalarga",
    precio:14000,
    talles:"M,L,XL,XXL"
    
}
,
{
    id:30,
    nombre:"Argentina negro Conjunto",
    categoria: "Selecciones",
    precio:14000,
    talles:"M,L,XL,XXL"
    
}
,
{
    id:31,
    nombre:"Argentina Conjunto Blanco",
    categoria: "Selecciones",
    precio:14000,
    talles:"M,L,XL,XXL"
    
}
,
{
    id:32,
    nombre:"Fluminense Conjunto",
    categoria: "Sudamerica",
    precio:14000,
    talles:"M,L,XL,XXL"
    
}
,
{
    id:33,
    nombre:"Palmeiras Conjunto Musculosa",
    categoria: "Sudamerica",
    estilo:"Musculosa",
    precio:14000,
    talles:"M,L,XL,XXL"
    
}
,
{
    id:34,
    nombre:"Flamengo Conjunto Musculosa",
    categoria: "Sudamerica",
    estilo:"Musculosa",
    precio:14000,
    talles:"M,L,XL,XXL"
    
}
,
{
    id:35,
    nombre:"Fluminense Conjunto Musculosa",
    categoria: "Sudamerica",
    estilo:"Musculosa",
    precio:14000,
    talles:"M,L,XL,XXL"
    
},
{
    id:36,
    nombre:"Real Madrid Conjunto Mangalarga",
    categoria: "Europa",
    estilo:"Mangalarga",
    precio:14000,
    talles:"M,L,XL,XXL"
    
}
,
{
    id:37,
    nombre:"Real Madrid Conjunto Alternativo",
    categoria: "Europa",
    precio:14000,
    talles:"M,L,XL,XXL"
    
}
,
{
    id:38,
    nombre:"Barcelona Conjunto Mangalarga",
    categoria: "Europa",
    estilo:"Mangalarga",
    precio:14000,
    talles:"M,L,XL,XXL"
    
}
,
{
    id:39,
    nombre:"Barcelona Conjunto Alternativo",
    categoria: "Europa",
    precio:14000,
    talles:"M,L,XL,XXL"
    
}
,
{
    id:40,
    nombre:"Atletico Madrid Conjunto Mangalarga",
    categoria: "Europa",
    estilo:"Mangalarga",
    precio:14000,
    talles:"M,L,XL,XXL"
    
}
,
{
    id:41,
    nombre:"Inter De Milan Conjunto Mangalarga",
    categoria: "Europa",
    estilo:"Mangalarga",
    precio:14000,
    talles:"M,L,XL,XXL"
    
}
,
{
    id:42,
    nombre:"Milan Conjunto",
    categoria: "Europa",
    precio:14000,
    talles:"M,L,XL,XXL"
    
}
,
{
    id:43,
    nombre:"Milan Conjunto Alternativo",
    categoria: "Europa",
    precio:14000,
    talles:"M,L,XL,XXL"
    
},
{
    id:44,
    nombre:"Milan Conjunto Alternativo Negro",
    categoria: "Europa",
    precio:14000,
    talles:"M,L,XL,XXL"
    
}
,
{
    id:45,
    nombre:"Napoli Conjunto",
    categoria: "Europa",
    precio:14000,
    talles:"M,L,XL,XXL"
    
},
{
    id:46,
    nombre:"Liverpool Conjunto",
    categoria: "Europa",
    precio:14000,
    talles:"M,L,XL,XXL"
    
},
{
    id:47,
    nombre:"Los Pibes De Fiorito Conjunto",
    categoria: "Influencers",
    precio:14000,
    talles:"M,L,XL,XXL"
    
}
,
{
    id:48,
    nombre:"Los Pibes De Fiorito Conjunto Musculosa",
    categoria: "Influencers",
    estilo:"Musculosa",
    precio:14000,
    talles:"M,L,XL,XXL"
    
}
,
{
    id:49,
    nombre:"Los Pibes De Fiorito Mangalarga",
    categoria: "Influencers",
    estilo:"Mangalarga",
    precio:14000,
    talles:"M,L,XL,XXL"
    
}
,
{
    id:50,
    nombre:"Team Balanza Conjunto",
    categoria: "Influencers",
    precio:14000,
    talles:"M,L,XL,XXL"
    
},
{
    id:51,
    nombre:"Team Balanza Conjunto Musculosa",
    categoria: "Influencers",
    estilo:"Musculosa",
    precio:14000,
    talles:"M,L,XL,XXL"
    
}
,
{
    id:52,
    nombre:"Team Nene Conjunto",
    categoria: "Influencers",
    precio:14000,
    talles:"M,L,XL,XXL"
    
},
{
    id:53,
    nombre:"Team Nene Mangalarga",
    categoria: "Influencers",
    estilo:"Mangalarga",
    precio:14000,
    talles:"M,L,XL,XXL"
    
}
,
{
    id:54,
    nombre:"MDS Conjunto Musculosa",
    categoria: "Influencers",
    estilo:"Musculosa",
    precio:14000,
    talles:"M,L,XL,XXL"
    
}
,
{
    id:55,
    nombre:"MDS Mangalarga",
    categoria: "Influencers",
    estilo:"Mangalarga",
    precio:14000,
    talles:"M,L,XL,XXL"
    
},
{
    id:56,
    nombre:"Francia Conjunto",
    categoria: "Selecciones",
    precio:14000,
    talles:"M,L,XL,XXL"
},
{
    id:57,
    nombre:"Brasil Mangalarga",
    categoria: "Selecciones",
    estilo:"Mangalarga",
    precio:14000,
    talles:"M,L,XL,XXL"
}
]
// querySelector() = busca UN elemento en el HTML
// querySelectorAll() = busca TODOS los elementos que coincidan
// addEventListener() = "escucha" cuando pasa algo (click, escribir, etc.)
// forEach() = recorre un array o lista uno por uno
// includes() = verifica si un texto contiene otro texto
// style.display = mostrar u ocultar elementos
    // Ejecutar la función
    // registroYVerificacion();


const lupa_boton = document.querySelector(".btn-lupa");
const buscador_input = document.querySelector(".Buscador");

// Guarda TODOS los productos
const todosLosProductos = document.querySelectorAll(".bg-white.border.rounded-lg");

//  lupa móvil
lupa_boton.addEventListener("click", () => {
    buscador_input.classList.toggle("hidden");
    buscador_input.classList.toggle("sm:block");
    buscador_input.focus();
});

// Escuchar  el usuario 
buscador_input.addEventListener("input", (e) => {
    const textoBusqueda = e.target.value.toLowerCase().trim();
    buscarProductos(textoBusqueda);
});

//Función de búsqueda 
function buscarProductos(texto) {
    let productosEncontrados = 0;
    
    // Remover mensaje previo si existe
    const mensajePrevio = document.querySelector("#mensaje-no-encontrado");
    if (mensajePrevio) {
        mensajePrevio.remove();
    }

    // Si no hay texto, mostrar todos
    if (texto === "") {
        todosLosProductos.forEach(producto => {
            producto.style.display = "";
        });
        return;
    }

    // Recorrer cada producto
    todosLosProductos.forEach(producto => {
        const nombreProducto = producto.querySelector("h3").textContent.toLowerCase();
        
        if (nombreProducto.includes(texto)) {
            producto.style.display = "";
            productosEncontrados++;
        } else {
            producto.style.display = "none";
        }
    });

    // Si no se encontraron productos, mostrar mensaje
    if (productosEncontrados === 0) {
        mostrarMensajeNoEncontrado(texto);
    }
}

// Mostrar mensaje de "no encontrado"
function mostrarMensajeNoEncontrado(textoBusqueda) {
    // Buscar el primer contenedor grid de productos
    const contenedorGrid = document.querySelector(".grid.grid-cols-1");
    
    // Crear el mensaje
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
    
    // Insertar el mensaje al inicio del grid
    contenedorGrid.insertBefore(mensaje, contenedorGrid.firstChild);
}

//Función para limpiar
function limpiarBusqueda() {
    buscador_input.value = "";
    buscarProductos("");
}


// SECCION CONTACTO CON EMAILJS

emailjs.init("0BurCND5jdUezS9ZJ"); 

const form = document.getElementById('form-contacto');
const btn = form.querySelector('button[type="submit"]');

const SERVICE_ID = 'service_ljafooc'; 
const TEMPLATE_ID = 'template_padj6wu'; 

form.addEventListener('submit', function(event) {
    event.preventDefault(); 

    const originalText = btn.innerText;
    btn.innerText = 'Enviando...';
    btn.disabled = true; 

    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, this)
        .then(() => {
            // ✅ Éxito: reemplaza el contenido del formulario
            form.innerHTML = `
                <div class="p-6 text-center">
                    <h2 class="text-2xl font-bold mb-4">Envíanos un mensaje</h2>
                    <div class="flex justify-center mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h3 class="text-lg font-semibold text-green-600">¡Mensaje enviado con éxito!</h3>
                    <p class="text-gray-600 mt-2">Gracias por contactarnos. Te responderemos pronto.</p>
                    <button id="volver-form" class="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                        Enviar otro mensaje
                    </button>
                </div>
            `;

            // Botón para volver a mostrar el formulario (sin recargar la página)
            document.getElementById('volver-form').addEventListener('click', () => location.reload());
        }, (error) => {
            console.error('EmailJS Error:', error);

            // ❌ Error: 
            form.innerHTML = `
                <div class="p-6 text-center">
                    <h2 class="text-2xl font-bold mb-4">Envíanos un mensaje</h2>
                    <div class="flex justify-center mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </div>
                    <h3 class="text-lg font-semibold text-red-600">No se pudo enviar el mensaje</h3>
                    <p class="text-gray-600 mt-2">Ocurrió un error al intentar enviarlo. Por favor, inténtalo nuevamente.</p>
                    <button id="reintentar" class="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                        Reintentar
                    </button>
                </div>
            `;

            // Botón para recargar el formulario
            document.getElementById('reintentar').addEventListener('click', () => location.reload());
        })
        .finally(() => {
            btn.innerText = originalText; 
            btn.disabled = false; 
        });
});
    // // CARRRITO PROXIMAMENTE
    let carrito=[];
    let total=0;
    
    function agregado_carrito(){
        let agregado=document.querySelector("btn-cards");
    agregado.textContent="Agregado al carrito"

    }
