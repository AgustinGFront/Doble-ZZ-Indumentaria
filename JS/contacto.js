// 1. Exportamos la función principal que llamará main.js
export function inicializarContacto() {

  // SECCION CONTACTO CON EMAILJS

  // 2. "If Guard" (Tu código ya lo tenía, ¡perfecto!)
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
          if(btn) { 
            btn.innerText = originalText; 
            btn.disabled = false; 
          }
        });
    });

  } // Fin del if (form)

} // <-- 3. Cierre de la función "inicializarContacto"