// import { stateFirebase, readUserData } from '../firebase/auth.js';
import { auth, onAuthStateChanged } from '../firebase/init.js';
import { onNavigate } from '../main.js';

export const profileUser = async () => {
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
      } else {
        profileImg.src = '../img/perfil.png';
      }
    } else {
      console.log('Usuario deslogeado');
    }
  });

  // Cerrar sesion
  closeSesion.addEventListener('click', () => {
    auth.signOut();
    onNavigate('/');
  });
};
