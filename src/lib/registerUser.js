import { registerFirebase } from '../firebase/auth.js';

export const registerUser = () => {
  const form = document.querySelector('#form');
  const errorDiv = document.querySelector('#error');

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const email = event.target[0].value;
    const password = event.target[1].value;
    const passwordConfirmed = event.target[2].value;

    if (password === passwordConfirmed) {
      const result = await registerFirebase(email, password);
      if (result === 'Firebase: Error (auth/email-already-in-use).') {
        errorDiv.innerText = 'Correo ya existe';
      } else if (result === 'Firebase: Password should be at least 6 characters (auth/weak-password).') {
        errorDiv.innerText = 'La clave debe tener al menos 6 caracteres';
      } else if (result === 'Firebase: Error (auth/internal-error).') {
        errorDiv.innerText = 'Por favor ingresa una contraseña';
      } else if (result === 'Firebase: Error (auth/invalid-email).') {
        errorDiv.innerText = 'Por favor ingresa un correo';
      } else {
        errorDiv.innerText = 'correo creado exitosamente';
      }
    } else {
      errorDiv.innerText = 'Las contraseñas no coinciden';
    }
  });
};
