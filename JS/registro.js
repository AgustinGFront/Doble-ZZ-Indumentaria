
import { 
  createUserWithEmailAndPassword, 
  signInWithPopup,
  updateProfile // <-- IMPORTANTE: Faltaba importar esto
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import { auth, googleProvider } from './firebase.js';

export function inicializarRegistro() {
  const formRegistro = document.getElementById('form-registro'); // Asumo ID del form
  const btnGoogleRegistro = document.getElementById('btn-google-registro'); // Asumo ID del botón de Google
  const errorDiv = document.getElementById('registro-error'); // Asumo <div id="registro-error">

  // --- 1. Listener para el botón de Google ---
  if (btnGoogleRegistro) {
    btnGoogleRegistro.addEventListener('click', async () => {
      try {
        await signInWithPopup(auth, googleProvider);
        alert('¡Registro exitoso con Google!');
        window.location.href = '../index.html';
      } catch (error) {
        console.error("Error con Google:", error);
        alert('Error al registrarse con Google');
      }
    });
  }

  //  Listener para el formulario de Email ---
  // (Este 'if' se asegura de que solo corra en la pág de registro)
  if (formRegistro) {
    formRegistro.addEventListener('submit', async (e) => { 
      e.preventDefault();
      
      // Asumo que estos son los IDs de tus inputs en registro.html
      const nombre = document.getElementById('registro-nombre').value; 
      const email = document.getElementById('registro-email').value;
      const password = document.getElementById('registro-password').value;
      const passwordConfirm = document.getElementById('registro-confirm-password').value;
      const terminos = document.getElementById('terminos').checked; // Asumo ID 'terminos'
      
      if (password.length < 6) {
        alert('La contraseña debe tener al menos 6 caracteres');
        return;
      }
      
      if (password !== passwordConfirm) {
        alert('Las contraseñas no coinciden');
        return;
      }
      
      if (!terminos) {
        alert('Debes aceptar los términos y condiciones');
        return;
      }
      
      try {
        // --- Crear usuario en Firebase ---
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // --- Guardar el nombre del usuario ---
        await updateProfile(user, {
          displayName: nombre
        });
        
        alert('¡Cuenta creada exitosamente!');
        window.location.href = './login.html'; // Lo mandamos a que inicie sesión

      } catch (error) {
        console.error("Error al crear cuenta:", error);
        if (error.code === 'auth/email-already-in-use') {
          alert('Este correo ya está registrado');
        } else {
          alert('Error al crear la cuenta: ' + error.message);
        }
      }
    });
  } 
}