# ⚽ Doble ZZ - Ecommerce de Indumentaria Deportiva

> "Ropa de potrero, corazón de cancha"

**Doble ZZ** es un proyecto de e-commerce completamente funcional enfocado en la venta de indumentaria deportiva. Este sitio web es una tienda online construida con tecnologías frontend modernas y Firebase como backend para la autenticación y gestión de usuarios.

---

## ✨ Características Principales

* **Autenticación de Usuarios:** Sistema completo de **Registro** e **Inicio de Sesión** (con email/contraseña y Google) usando Firebase Authentication.
* **Gestión de Perfil:** Los usuarios logueados pueden acceder a una página de perfil (`perfil.html`) para ver sus datos y cerrar sesión.
* **Páginas Protegidas:** Las páginas de `login.html` y `registro.html` detectan si el usuario ya está logueado y lo redirigen o le muestran la opción de cerrar sesión.
* **Catálogo de Productos:** Muestra de productos con imágenes, nombre y precio.
* **Carrito de Compras:** Funcionalidad de "Agregar al carrito" que guarda los productos en `localStorage` para persistir la sesión del usuario.
* **Búsqueda en Vivo:** Una barra de búsqueda (`buscador.js`) que filtra productos en la página `productos.html` o redirige a ella desde otras páginas.
* **Filtros de Productos:** (Si `filtros.js` está completo) Panel para filtrar productos por talle, precio, etc.
* **Diseño Responsivo:** Creado con TailwindCSS, adaptándose a dispositivos móviles y de escritorio.

---

## 🛠️ Tecnologías Utilizadas

### Frontend
* **HTML5**
* **CSS3** (con `styles.css`)
* **TailwindCSS** (Usado para el diseño de componentes)
* **JavaScript (ES6+ Modules)**: Todo el código está modularizado (`main.js`, `auth.js`, `carrito.js`, etc.)

### Backend (BaaS)
* **Firebase Authentication:** Para el manejo de usuarios (Email/Contraseña y Google Sign-In).

---

## 🚀 Cómo Ponerlo en Marcha

Si querés clonar este repositorio y correrlo en tu máquina local, seguí estos pasos:

### 1. Clonar el Repositorio
```bash
# Reemplazá con la URL de tu repositorio
git clone [https://github.com/tu-usuario/doble-zz.git](https://github.com/tu-usuario/doble-zz.git)
cd doble-zz