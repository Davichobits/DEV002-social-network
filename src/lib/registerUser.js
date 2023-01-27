import { registerFirebase, writeUserData } from '../firebase/auth.js';
import { onNavigate } from '../main.js';

export const registerUser = () => {
  const form = document.querySelector('#form');
  const errorDiv = document.querySelector('#error');

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const nameUser = event.target[0].value;
    const emailUser = event.target[1].value;
    const password = event.target[2].value;
    const passwordConfirmed = event.target[3].value;

    

    if (password === passwordConfirmed) {
      const result = await registerFirebase(emailUser, password);
      if (result === 'Firebase: Error (auth/email-already-in-use).') {
        errorDiv.innerText = 'Correo ya existe';
      } else if (result === 'Firebase: Password should be at least 6 characters (auth/weak-password).') {
        errorDiv.innerText = 'La clave debe tener al menos 6 caracteres';
      } else if (result === 'Firebase: Error (auth/internal-error).') {
        errorDiv.innerText = 'Por favor ingresa una contraseña';
      } else if (result === 'Firebase: Error (auth/invalid-email).') {
        errorDiv.innerText = 'Por favor ingresa un correo';
      } else {

        const newUser = {
          id: result.user.uid,
          name: nameUser,
          email: emailUser,
          pass: password,
          passConfirmed: passwordConfirmed,
        };

        writeUserData(newUser.id, newUser);
        alert(`${newUser.name}, tu cuenta ha sido creada correctamente`);
        onNavigate('/login');
      }
    } else {
      errorDiv.innerText = 'Las contraseñas no coinciden';
    }
  });
};
