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
    precio:10000,
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
    precio:10000,
    talles:"M,L,XL,XXL"
},
{
    id:5,
    nombre:"River Mangalarga",
    categoria: "Primera Division",
    estilo:"Mangalarga",
    precio:10000,
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
    precio:10000,
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
    precio:10000,
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
    precio:10000,
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
    precio:10000,
    talles:"M,L,XL,XXL"
    
}
,
{
    id:25,
    nombre:"Chacarita Mangalarga",
    categoria: "Ascenso",
    estilo:"Mangalarga",
    precio:10000,
    talles:"M,L,XL,XXL" 
}
,
{
    id:26,
    nombre:"Quilmes Mangalarga",
    categoria: "Ascenso",
    estilo:"Mangalarga",
    precio:10000,
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
    precio:10000,
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
    precio:10000,
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
    precio:10000,
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
    precio:10000,
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
    precio:10000,
    talles:"M,L,XL,XXL"
}
,
{
   id:58,
    nombre:"Conjunto Brasil",
    categoria: "Selecciones",
    precio:14000,
    talles:"M,L,XL,XXL"
}
,
{
   id:59,
    nombre:"Conjunto Argentina",
    categoria: "Selecciones",
    precio:14000,
    talles:"M,L,XL,XXL"
}
,
{
   id:60,
    nombre:"Conjunto Italia",
    categoria: "Selecciones",
    precio:14000,
    talles:"M,L,XL,XXL"
}
,
{
   id:61,
    nombre:"Conjunto Independiente",
    categoria: "Primera Division",
    precio:14000,
    talles:"M,L,XL,XXL"
}
,
{
   id:62,
    nombre:"Conjunto Boca Juniors",
    categoria: "Primera Division",
    precio:14000,
    talles:"M,L,XL,XXL"
}
,
{
   id:63,
    nombre:"Conjunto Chelsea",
    categoria: "Europa",
    precio:14000,
    talles:"M,L,XL,XXL"
}
,
{
   id:64,
    nombre:"Conjunto Colon",
    categoria: "Ascenso",
    precio:14000,
    talles:"M,L,XL,XXL"
}
,
{
   id:65,
    nombre:"Conjunto Bayern Leverkusen",
    categoria: "Europa",
    precio:14000,
    talles:"M,L,XL,XXL"
}
,
{
   id:66,
    nombre:"Conjunto Italia",
    categoria: "Selecciones",
    precio:14000,
    talles:"M,L,XL,XXL"
}
,
{
   id:67,
    nombre:"Conjunto Racing",
    categoria: "Primera Division",
    precio:14000,
    talles:"M,L,XL,XXL"
}
,
{
   id:68,
    nombre:"Conjunto Colombia",
    categoria: "Selecciones",
    precio:14000,
    talles:"M,L,XL,XXL"
}
,
{
   id:69,
    nombre:"Conjunto Team Nene",
    categoria: "Influencers",
    precio:14000,
    talles:"M,L,XL,XXL"
}
,
{
   id:70,
    nombre:"Conjunto Roma",
    categoria: "Europa",
    precio:14000,
    talles:"M,L,XL,XXL"
}
,
{
   id:71,
    nombre:"Conjunto Dortmund",
    categoria: "Europa",
    precio:14000,
    talles:"M,L,XL,XXL"
}
,
{
   id:72,
    nombre:"Conjunto Milan",
    categoria: "Europa",
    precio:14000,
    talles:"M,L,XL,XXL"
}
,
{
   id:73,
    nombre:"Conjunto Atletico Negra",
    categoria: "Europa",
    precio:14000,
    talles:"M,L,XL,XXL"
}
,
{
   id:74,
    nombre:"Conjunto River Plate Camisa",
    categoria: "Primera Division",
    precio:14000,
    talles:"M,L,XL,XXL"
}
,
{
   id:75,
    nombre:"Conjunto Napoli",
    categoria: "Europa",
    precio:14000,
    talles:"M,L,XL,XXL"
}
,
{
   id:76,
    nombre:"Conjunto Chicago",
    categoria: "Ascenso",
    precio:14000,
    talles:"M,L,XL,XXL"
}

]
const lupa_boton = document.querySelector(".btn-lupa");
const buscador_input = document.querySelector(".Buscador");

// Guarda TODOS los productos
const todosLosProductos = document.querySelectorAll(".flex-1 .bg-white.border.rounded-lg");

//  lupa móvil
lupa_boton.addEventListener("click", () => {
    buscador_input.classList.toggle("hidden");
    buscador_input.classList.toggle("sm:block");
    buscador_input.focus();
});

// Escuchar  el usuario 
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
  to           <svg class="mx-auto h-16 w-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
warning                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
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

// Primero, intentamos encontrar el formulario de contacto
const form = document.getElementById('form-contacto');

// Solo ejecutamos el código de EmailJS SI el formulario existe en esta página.
if (form) {
  emailjs.init("0BurCND5jdUezS9ZJ"); 

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
Additional                 <h2 class="text-2xl font-bold mb-4">Envíanos un mensaje</h2>
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
En                   Reintentar
                  </button>
              </div>
          `;

          // Botón para recargar el formulario
          document.getElementById('reintentar').addEventListener('click', () => location.reload());
      })
      .finally(() => {
          // Esto solo se ejecutará si 'btn' se definió (porque form existe)
          // pero para más seguridad, podríamos verificar 'btn' también.
          if(btn) { 
              btn.innerText = originalText; 
            btn.disabled = false; 
          }
      });
  });

}
// --- VARIABLES GLOBALES Y CONSTANTES ---
let carrito = [];
const KEY_LOCALSTORAGE = 'carritoDeCompras';

// --- SELECTORES DEL DOM ---
// (IDs de tu Navbar y del Modal)
const btnVerCarrito = document.getElementById('btn-ver-carrito');
const btnCerrarCarrito = document.getElementById('btn-cerrar-carrito');
const modalCarrito = document.getElementById('modal-carrito');

const listaCarrito = document.getElementById('lista-carrito');
const totalCarrito = document.getElementById('total-carrito');
const cantidadCarrito = document.getElementById('cantidad-carrito'); // La "burbuja" roja


// --- 1. FUNCIÓN DE INICIO ---


// --- 2. LÓGICA DEL CARRITO ---

/**
 * Agrega un producto al carrito.
 */
function agregarAlCarrito(e) {
    e.preventDefault();
    const boton = e.target;
    
    // Obtenemos los datos del producto desde los data-attributes del botón
    const producto = {
        id: boton.dataset.id,
        nombre: boton.dataset.nombre,
        precio: parseFloat(boton.dataset.precio),
        cantidad: 1,
        imagen: boton.dataset.imagen,
    };
    
    // Buscamos si el producto ya está en el carrito
    const productoExistente = carrito.find(item => item.id === producto.id);
    
    if (productoExistente) {
        // Si ya existe, solo aumentamos la cantidad
        productoExistente.cantidad++;
    } else {
        // Si es nuevo, lo agregamos al array
        carrito.push(producto);
    }
    
    // Actualizamos la vista y guardamos en storage
    renderizarCarrito();
    guardarCarritoEnStorage();
    
    // Abrimos el modal para que el usuario vea que se agregó
    mostrarModalCarrito();
}

/**
 */
function renderizarCarrito() {
    if (!listaCarrito) {
        return; 
    }
    // 1. Limpiamos el HTML anterior
    listaCarrito.innerHTML = '';
    
    let totalGeneral = 0;
    let cantidadTotal = 0;
    
    // 2. Recorremos el array del carrito
    carrito.forEach(item => {
        const subtotal = item.precio * item.cantidad;
        totalGeneral += subtotal;
        cantidadTotal += item.cantidad;
        
        // 3. Creamos un <li> por cada producto (con clases de Tailwind)
      const li = document.createElement('li');
        li.className = 'flex justify-between items-center py-4';
        li.innerHTML = `
<img src="${item.imagen}" alt="${item.nombre}" class="w-16 h-16 object-cover rounded-md border">
            <span class="text-gray-700">${item.nombre} (x${item.cantidad})</span>
            <span class="font-bold text-gray-900">$${subtotal.toFixed(2)}</span>
            <button class="btn-eliminar-item text-red-500 hover:text-red-700" data-id="${item.id}">
              X
            </button>
        `;
        listaCarrito.appendChild(li);
    });
    
    // 4. Actualizamos los totales en el HTML
    totalCarrito.textContent = `$${totalGeneral.toFixed(2)}`;
    cantidadCarrito.textContent = cantidadTotal; // Actualiza el número en la navbar
    
    // 5. Mostramos u ocultamos la "burbuja" roja de la navbar
    if (cantidadTotal > 0) {
        cantidadCarrito.classList.remove('hidden'); // Lo muestra
    } else {
        cantidadCarrito.classList.add('hidden'); // Lo oculta
    }
}

/**
El  * Elimina un item del carrito basado en su ID.
 */
function eliminarItemDelCarrito(e) {
    // Verificamos que se hizo clic en un botón de eliminar
    if (!e.target.classList.contains('btn-eliminar-item')) {
        return;
    }
    
    const idItem = e.target.dataset.id;
    
    // Filtramos el carrito, creando un nuevo array sin ese item
    carrito = carrito.filter(item => item.id !== idItem);
    
    // Volvemos a renderizar y guardar
    renderizarCarrito();
    guardarCarritoEnStorage();
}


// --- 3. LOCALSTORAGE ---

/**
s  * Guarda el estado actual del carrito en localStorage.
 */
function guardarCarritoEnStorage() {
    localStorage.setItem(KEY_LOCALSTORAGE, JSON.stringify(carrito));
}

/**
 * Carga el carrito desde localStorage al iniciar la página.
 */
function cargarCarritoDesdeStorage() {
    const carritoGuardado = localStorage.getItem(KEY_LOCALSTORAGE);
    if (carritoGuardado) {
      // Si había algo guardado, lo convertimos de JSON a un array
       carrito = JSON.parse(carritoGuardado);
    }
}


// --- 4. MANEJO DE EVENTOS (Binding) ---

/**
 * Busca todos los botones ".btn-agregar" y les asigna el evento click.
 */
function enlazarBotonesAgregar() {
    // Esta clase DEBES ponerla en los botones de tus tarjetas de producto
    const botonesAgregar = document.querySelectorAll('.btn-agregar'); 
    
    if (botonesAgregar.length === 0) {
        // Si no se encuentran (quizás la página carga lento),
fs         // reintentamos después de un momento.
        setTimeout(enlazarBotonesAgregar, 500);
        return;
    }
    
    botonesAgregar.forEach(boton => {
        boton.addEventListener('click', agregarAlCarrito);
    });
}

/**
 * Asigna los clics para abrir/cerrar la interfaz y eliminar items.
 */
function enlazarEventosInterfaz() {
    // Clic para ABRIR el modal
    btnVerCarrito.addEventListener('click', mostrarModalCarrito);

    // Clic para CERRAR el modal
    btnCerrarCarrito.addEventListener('click', ocultarModalCarrito);
    
    // Clic para ELIMINAR (usando delegación de eventos)
    listaCarrito.addEventListener('click', eliminarItemDelCarrito);
}

// --- 5. FUNCIONES DEL MODAL (Controlan Tailwind) ---

function mostrarModalCarrito() {
    modalCarrito.classList.remove('hidden');
}

function ocultarModalCarrito() {
    modalCarrito.classList.add('hidden');
}


// --- INICIAR LA APLICACIÓN ---
// 'DOMContentLoaded' espera a que todo el HTML esté listo
document.addEventListener('DOMContentLoaded', inicializarAplicacion);




// --- [INICIO] CÓDIGO DE FILTROS ---

// --- 1. SELECTORES DE ELEMENTOS ---

// (Buscamos todos los elementos de los filtros)
const checksTalles = document.querySelectorAll('.filtro-talle');
const checksEstilos = document.querySelectorAll('.filtro-estilo');
const sliderPrecio = document.getElementById('precio-slider');
const valorPrecio = document.getElementById('precio-valor');

// (Buscamos TODAS las tarjetas de productos en el HTML)
// Usamos la misma clase que usa tu función de búsqueda
const todasLasTarjetas = document.querySelectorAll('.flex-1 .bg-white.border.rounded-lg');

/**
 * Función principal que se ejecuta CADA VEZ que un filtro cambia.
 */
function aplicarFiltros() {
    // 1. OBTENER VALORES DE LOS FILTROS

    // a. Talles: Crea un array con los talles seleccionados (ej: ['M', 'XL'])
    const tallesSeleccionados = Array.from(checksTalles)
                                    .filter(check => check.checked)
                                    .map(check => check.value);

    // b. Estilos: Crea un array con los estilos seleccionados (ej: ['Mangalarga'])
    const estilosSeleccionados = Array.from(checksEstilos)
                                     .filter(check => check.checked)
                                     .map(check => check.value);
    
    // c. Precio: Obtiene el valor máximo del slider
    const precioMaximo = parseFloat(sliderPrecio.value);

    // 2. RECORRER CADA TARJETA DE PRODUCTO Y DECIDIR SI MOSTRARLA
    
    todasLasTarjetas.forEach(tarjeta => {
        // a. Encontrar el ID del producto en la tarjeta
        //    (Lo tomamos del data-id del botón, que ya existe para el carrito)
        const boton = tarjeta.querySelector('.btn-agregar');
        if (!boton || !boton.dataset.id) {
            tarjeta.style.display = 'none'; // Ocultar si no tiene botón o ID
            return; // Ir a la siguiente tarjeta
        }
        
        const idProducto = boton.dataset.id;
        
        // b. Buscar la "data" de este producto en nuestro array 'productos'
        const dataProducto = productos.find(p => p.id == idProducto);

        if (!dataProducto) {
            tarjeta.style.display = 'none'; // Ocultar si no encontramos su data
            return; 
        }

        // c. APLICAR LÓGICA DE FILTROS
        //    (Comparamos la data del producto con los filtros seleccionados)

        // Verificación 1: Precio
        const pasaPrecio = dataProducto.precio <= precioMaximo;

        // Verificación 2: Talles
        let pasaTalles = true; // Es 'true' si no se seleccionó ningún talle
        if (tallesSeleccionados.length > 0) {
            // Si hay talles seleccionados, comprobamos si el producto tiene AL MENOS UNO
            const tallesProducto = dataProducto.talles.split(','); // ej: ["M", "L", "XL", "XXL"]
            pasaTalles = tallesSeleccionados.some(talle => tallesProducto.includes(talle));
        }
        
        // Verificación 3: Estilos
        let pasaEstilos = true; // Es 'true' si no se seleccionó ningún estilo
        if (estilosSeleccionados.length > 0) {
            // Si el producto no define estilo, asumimos "Manga Corta" (para los conjuntos)
            const estiloProducto = dataProducto.estilo || "Manga Corta"; 
            pasaEstilos = estilosSeleccionados.includes(estiloProducto);
        }

        // d. DECISIÓN FINAL
        if (pasaPrecio && pasaTalles && pasaEstilos) {
            tarjeta.style.display = ''; // Mostrar tarjeta
        } else {
            tarjeta.style.display = 'none'; // Ocultar tarjeta
        }
    });
}

/**
 * Función que se llama desde el botón 'Limpiar Filtros' en el HTML.
 */
function limpiarFiltros() {
    // 1. Desmarcar todos los checkboxes
    checksTalles.forEach(check => check.checked = false);
    checksEstilos.forEach(check => check.checked = false);
    
    // 2. Resetear el slider de precio
    sliderPrecio.value = sliderPrecio.max; // Ponerlo al máximo (20000)
    
    // 3. Actualizar el texto del valor
    // (Usamos toLocaleString para formatear el número "20000" como "20.000")
    valorPrecio.textContent = `$${parseFloat(sliderPrecio.max).toLocaleString('es-ES')}`;
    
    // 4. Volver a correr la lógica de filtros (ahora mostrará todos)
    aplicarFiltros();
}

/**
 * Función que "activa" todos los listeners de los filtros.
 */
function configurarFiltros() {
    // 1. Si no estamos en la página de productos (no hay filtros), no hacer nada.
    if (!sliderPrecio) {
        return;
    }

    // 2. Añadir un "oyente" a cada checkbox de talle
    checksTalles.forEach(check => {
        check.addEventListener('change', aplicarFiltros);
    });

    // 3. Añadir un "oyente" a cada checkbox de estilo
    checksEstilos.forEach(check => {
        check.addEventListener('change', aplicarFiltros);
    });

    // 4. Añadir un "oyente" al slider de precio
    sliderPrecio.addEventListener('input', (e) => {
        // Cuando muevo el slider, actualizo el texto del precio...
        const valorFormateado = parseFloat(e.target.value).toLocaleString('es-ES');
        valorPrecio.textContent = `$${valorFormateado}`;
        
        // ...y también aplico el filtro
        aplicarFiltros();
    });

    // (No necesitamos agregar listener al botón "Limpiar" porque
    // ya lo tienes en tu HTML con `onclick="limpiarFiltros()"`)
}

// --- [FIN] CÓDIGO DE FILTROS ---
// Se ejecuta cuando todo el HTML está cargado
function inicializarAplicacion() {
        // 1.1 Cargar carrito desde localStorage
        cargarCarritoDesdeStorage();
        
        // 1.2 Actualizar la vista con lo que cargamos
        renderizarCarrito();
        
        // 1.3 Buscar botones de "Agregar"
        enlazarBotonesAgregar();
        
        // 1.4 Asignar eventos a la interfaz (abrir/cerrar modal, eliminar)
    enlazarEventosInterfaz();
        configurarFiltros(); 
    }

            // Toggle password visibility
        const togglePassword = document.getElementById('toggle-password');
        const passwordInput = document.getElementById('password');
        const eyeIcon = document.getElementById('eye-icon');

        togglePassword.addEventListener('click', () => {
            const type = passwordInput.type === 'password' ? 'text' : 'password';
            passwordInput.type = type;
            eyeIcon.classList.toggle('fa-eye');
            eyeIcon.classList.toggle('fa-eye-slash');
        });

        // Toggle confirm password visibility
        const togglePasswordConfirm = document.getElementById('toggle-password-confirm');
        const passwordConfirmInput = document.getElementById('password-confirm');
        const eyeIconConfirm = document.getElementById('eye-icon-confirm');

        togglePasswordConfirm.addEventListener('click', () => {
            const type = passwordConfirmInput.type === 'password' ? 'text' : 'password';
            passwordConfirmInput.type = type;
            eyeIconConfirm.classList.toggle('fa-eye');
            eyeIconConfirm.classList.toggle('fa-eye-slash');
        });

        // Validación del formulario
        const form2 = document.getElementById('form-registro');
        
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const password = passwordInput.value;
            const passwordConfirm = passwordConfirmInput.value;
            const terminos = document.getElementById('terminos').checked;
            
            // Validar longitud de contraseña
            if (password.length < 6) {
                alert('La contraseña debe tener al menos 6 caracteres');
                return;
            }
            
            // Validar que las contraseñas coincidan
            if (password !== passwordConfirm) {
                alert('Las contraseñas no coinciden');
                return;
            }
            
            // Validar términos y condiciones
            if (!terminos) {
                alert('Debes aceptar los términos y condiciones');
                return;
            }
            
            // Aquí iría la lógica de registro (Firebase, etc.)
            alert('¡Cuenta creada exitosamente! (Aquí se conectaría con Firebase)');
            
            // Redirigir al login o al home
            // window.location.href = './login.html';
        });

        // Menú móvil
        const mobileMenuButton = document.querySelector('[aria-controls="mobile-menu"]');
        const mobileMenu = document.getElementById('mobile-menu');

        if (mobileMenuButton) {
            mobileMenuButton.addEventListener('click', () => {
                mobileMenu.classList.toggle('hidden');
            });
        }