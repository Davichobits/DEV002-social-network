/* eslint-disable import/no-cycle */
import { loginFirebase, launchGoogleLogin } from '../firebase/auth.js';
import { GoogleAuthProvider } from '../firebase/init.js';
import { onNavigate } from '../main.js';

export const loginLogic = () => {
  const form = document.querySelector('#form');
  const errorDiv = document.querySelector('#error');
  const loginGoogleBtn = document.querySelector('#loginGoogleBtn');

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
    } else if (result === 'Firebase: Error (auth/user-not-found).') {
      errorDiv.innerText = 'Usuario no encontrado';
    } else {
      onNavigate('/profile');
    }
  });

  loginGoogleBtn.addEventListener('click', async () => {
    const result = await launchGoogleLogin();

    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    const user = result.user;

    // Guardardo localstorage
    localStorage.setItem('token', token);

    if (user) {
      onNavigate('/profile');
    }
  });
};
