// js/registro.js

// 1. Exportamos la función principal que llamará main.js
export function inicializarRegistro() {

  // 2. Selectores (los movemos adentro)
  const form2 = document.getElementById('form-registro');

  // 3. "IF GUARD" (La comprobación de seguridad)
  // Si no está el formulario, no estamos en la página de registro.
  if (!form2) {
    return; // No hacer nada
  }

  // 4. El resto de tu código (se ejecuta solo si pasamos la guardia)
  const togglePassword = document.getElementById('toggle-password');
  const passwordInput = document.getElementById('password');
  const eyeIcon = document.getElementById('eye-icon');
  
  const togglePasswordConfirm = document.getElementById('toggle-password-confirm');
  const passwordConfirmInput = document.getElementById('password-confirm');
  const eyeIconConfirm = document.getElementById('eye-icon-confirm');

  // Toggle password visibility
  if (togglePassword) {
      togglePassword.addEventListener('click', () => {
          const type = passwordInput.type === 'password' ? 'text' : 'password';
          passwordInput.type = type;
          if (eyeIcon) { // Añadimos chequeo por si acaso
            eyeIcon.classList.toggle('fa-eye');
            eyeIcon.classList.toggle('fa-eye-slash');
          }
      });
  }

  // Toggle confirm password visibility
  if (togglePasswordConfirm) {
      togglePasswordConfirm.addEventListener('click', () => {
          const type = passwordConfirmInput.type === 'password' ? 'text' : 'password';
          passwordConfirmInput.type = type;
          if (eyeIconConfirm) { // Añadimos chequeo por si acaso
            eyeIconConfirm.classList.toggle('fa-eye');
            eyeIconConfirm.classList.toggle('fa-eye-slash');
          }
      });
  }

  // Validación del formulario
  form2.addEventListener('submit', (e) => { 
      e.preventDefault();
      
      // Obtenemos los valores DENTRO del submit
      const password = passwordInput.value;
      const passwordConfirm = passwordConfirmInput.value;
      const terminos = document.getElementById('terminos').checked;
      
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
      
      alert('¡Cuenta creada exitosamente! (Aquí se conectaría con Firebase)');
      
      // Redirigir al login o al home
      // window.location.href = './login.html';
  });

} // <-- 5. Cierre de la función "inicializarRegistro"