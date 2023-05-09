import { savePost, getPosts, updateNumberOfLikes } from '../firebase/auth.js';
import { auth, onAuthStateChanged } from '../firebase/init.js';
// eslint-disable-next-line import/no-cycle
import { onNavigate } from '../main.js';
// eslint-disable-next-line import/no-cycle

// Dibujar post de firebase
const drawPostFromFirebase = (querySnapshot, postsContainer, userId) => {
  // eslint-disable-next-line no-param-reassign
  postsContainer.innerHTML = '';
  querySnapshot.forEach((doc) => {
    // eslint-disable-next-line no-param-reassign
    // eslint-disable-next-line no-param-reassign
    const likesCounter = doc.data().likes.length;
    const idUserInPost = doc.data().userId;
    postsContainer.innerHTML += `
          <div class="border-2 rounded-lg p-2 my-4" id="${doc.id}">
            <div class='flex place-content-between '>
              <p class='w-20 text-gray-400 text-[10px]'>5-may-23</p>
              <div class="flex items-center w-8 place-content-between">
                <span>${likesCounter}</span><img class='hearthBtn w-4 cursor-pointer' src=${(likesCounter !== 0) ? '../img/icons/corazon_rojo.png' : '../img/icons/corazon.png'} alt='icon' />
              </div>
              
            </div>
            <p class='my-4 mx-2'>${doc.data().post}</p>
            <div class='flex place-content-end'>
              <div class='flex w-12 place-content-between ${(idUserInPost === userId) ? 'block' : 'hidden'}'>
                <img class='w-4 cursor-pointer' src='../img/icons/basura.png' alt='icon' />
                <img class='w-4 cursor-pointer' src='../img/icons/editar.png' alt='icon' />
              </div>
            </div>
          <div>
        
        `;
    // console.log(doc.id, " => ", doc.data());
  });
}

const postsLogic = () => {
  //Boton de like
  const hearthBtn = document.querySelectorAll('.hearthBtn');
  hearthBtn.forEach((btn) => {
    btn.addEventListener('click', async (event) => {
      const idPost = event.target.parentElement.parentElement.parentElement.id;
      updateNumberOfLikes(auth.currentUser.uid, idPost);
      // Dibujar los posts por primera vez
      const allPosts = await getPosts('posts');
      const postsContainer = document.querySelector('#postsContainer');
      drawPostFromFirebase(allPosts, postsContainer);
      postsLogic();
    });
  });
};

export const profileLogic = async () => {
  const newPostLabel = document.querySelector('#newPostLabel');
  const profileImg = document.querySelector('#profileImg');
  const closeSesion = document.querySelector('#closeSesion');
  const postBtn = document.querySelector('#postBtn');
  const newPost = document.querySelector('#newPost');
  const postsContainer = document.querySelector('#postsContainer');

  // Observador
  onAuthStateChanged(auth, async (user) => {
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
      // Dibujar los posts por primera vez
      const userId = auth.currentUser.uid;
      const allPosts = await getPosts('posts');
      drawPostFromFirebase(allPosts, postsContainer, userId);
      postsLogic();
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
      userId: auth.currentUser.uid,
      likes: [],
      post: newPost.value,
    };

    if (newPost.value === '') {
      alert('No puedes publicar un post vacio');
    } else {
      // Guardar en firebase
      try {
        savePost(newPostObject);
        // Limpiar input
        newPost.value = '';

        // Dibujar los post actualizados
        const allPosts = await getPosts('posts');
        drawPostFromFirebase(allPosts, postsContainer);
        postsLogic();
      } catch (error) {
        console.log(error);
      }
    }
  });
};
