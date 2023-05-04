import { savePost, getPosts } from '../firebase/auth.js';
import { auth, onAuthStateChanged } from '../firebase/init.js';
// eslint-disable-next-line import/no-cycle
import { onNavigate } from '../main.js';
// eslint-disable-next-line import/no-cycle

export const profileLogic = async () => {
  const newPostLabel = document.querySelector('#newPostLabel');
  const profileImg = document.querySelector('#profileImg');
  const closeSesion = document.querySelector('#closeSesion');
  const postBtn = document.querySelector('#postBtn');
  const newPost = document.querySelector('#newPost');

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
        // localStorage.setItem('photoURL', user.photoURL);
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

  // Boton publicar
  postBtn.addEventListener('click', async () => {
    // Validar que no este vacio el input
    newPost.value = newPost.value.trim();

    const newPostObject = {
      post: newPost.value,
    }

    if (newPost.value === '') {
      alert('No puedes publicar un post vacio');
    } else {
      // Guardar en firebase
      try {
        savePost(newPostObject);
        console.log('post guardado');
      } catch (error) {
        console.log(error);
      }

      // Limpiar input
      newPost.value = '';

      // Mostrar post
      const postsContainer = document.querySelector('#postsContainer');

      // Traer post de firebase
      const querySnapshot = await getPosts();
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
      });
    }
  });
};
