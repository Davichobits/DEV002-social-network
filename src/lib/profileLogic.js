// import { stateFirebase, readUserData } from '../firebase/auth.js';
import { auth, onAuthStateChanged } from '../firebase/init.js';
// eslint-disable-next-line import/no-cycle
import { onNavigate } from '../main.js';
// eslint-disable-next-line import/no-cycle

export const profileLogic = async () => {
  const newPostLabel = document.querySelector('#newPostLabel');
  const profileImg = document.querySelector('#profileImg');
  const closeSesion = document.querySelector('#closeSesion');
  // const newPost = document.querySelector('#newPost');

  // Observador
  onAuthStateChanged(auth, (user) => {
    if (user) {
      if (user.displayName) {
        newPostLabel.innerText = `En que estás pensando hoy ${user.displayName}?`;
      } else {
        newPostLabel.innerText = 'En que estás pensando hoy?';
      }
      if (user.photoURL) {
        profileImg.src = user.photoURL;
        localStorage.setItem('photoURL', user.photoURL);
      } else {
        profileImg.src = '../img/perfil.png';
        localStorage.setItem('photoURL', '../img/perfil.png');
      }
    } else {
      // proteger ruta
      onNavigate('/');
    }
  });

  // Cerrar sesion
  closeSesion.addEventListener('click', () => {
    auth.signOut();
    onNavigate('/');
  });
};
