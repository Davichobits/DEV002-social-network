import { loginFirebase } from '../firebase/auth.js';

export const loginUser = () => {
  const form = document.querySelector('#form');
  const errorDiv = document.querySelector('#error');
  let logged = false;

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const email = event.target[0].value;
    const password = event.target[1].value;

    const result = await loginFirebase(email, password);
    if (result === 'Firebase: Error (auth/wrong-password).') {
      errorDiv.innerText = 'Contraseña incorrecta';
    } else if (result === 'Firebase: Error (auth/internal-error).') {
      errorDiv.innerText = 'Por favor ingresa una contraseña';
    } else if (result === 'Firebase: Error (auth/invalid-email).') {
      errorDiv.innerText = 'Por favor ingresa un correo';
    } else {
      errorDiv.innerText = 'Bienvenido';
      logged = true;
    }
    return logged;
  });
};
