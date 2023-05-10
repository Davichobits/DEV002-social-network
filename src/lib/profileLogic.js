import {
  savePost,
  getPosts,
  deletePost,
  updateNumberOfLikes,
  updatePost,
} from '../firebase/auth.js';
import { auth, onAuthStateChanged, Timestamp } from '../firebase/init.js';
// eslint-disable-next-line import/no-cycle
import { onNavigate } from '../main.js';
// eslint-disable-next-line import/no-cycle

// Dibujar post de firebase
const drawPostFromFirebase = (querySnapshot, postsContainer, userId) => {
  // eslint-disable-next-line no-param-reassign
  postsContainer.innerHTML = '';
  querySnapshot.forEach((doc) => {
    const likesCounter = doc.data().likes.length;
    const idUserInPost = doc.data().userId;
    // eslint-disable-next-line no-param-reassign
    postsContainer.innerHTML += `
          <div class="border-2 rounded-lg p-2 my-4" id="${doc.id}">
            <div class='flex place-content-between '>
              <p class='w-20 text-gray-400 text-[10px]'>${doc.data().date} ${doc.data().hour}</p>
              <div class="flex items-center w-8 place-content-between">
                <span>${likesCounter}</span><img class='hearthBtn w-4 cursor-pointer' src=${(likesCounter !== 0) ? '../img/icons/corazon_rojo.png' : '../img/icons/corazon.png'} alt='icon' />
              </div>
              
            </div>
            <p class='my-4 mx-2'>${doc.data().post}</p>
            <div class='flex place-content-end'>
              <div class='flex w-12 place-content-between ${(idUserInPost === userId) ? 'block' : 'hidden'}'>
                <img class='trashBtn w-4 cursor-pointer' src='../img/icons/basura.png' alt='icon' />
                <img class='editBtn w-4 cursor-pointer' src='../img/icons/editar.png' alt='icon' />
              </div>
            </div>
          <div>
        `;
  });
};

const postsLogic = () => {
  // Boton de like
  const hearthBtn = document.querySelectorAll('.hearthBtn');
  hearthBtn.forEach((btn) => {
    btn.addEventListener('click', async (event) => {
      const idPost = event.target.parentElement.parentElement.parentElement.id;
      updateNumberOfLikes(auth.currentUser.uid, idPost);
      // Dibujar los posts por primera vez
      const userId = auth.currentUser.uid;
      const allPosts = await getPosts('posts');
      const postsContainer = document.querySelector('#postsContainer');
      drawPostFromFirebase(allPosts, postsContainer, userId);
      postsLogic();
    });
  });

  // Boton eliminar post
  const trashBtn = document.querySelectorAll('.trashBtn');
  trashBtn.forEach((btn) => {
    btn.addEventListener('click', async (event) => {
      // eslint-disable-next-line no-restricted-globals
      const result = confirm('Seguro que quieres eliminar este post?');
      if (result) {
        const idPost = event.target.parentElement.parentElement.parentElement.id;
        await deletePost(idPost);
        // Volver a dibujar los posts
        const userId = auth.currentUser.uid;
        const allPosts = await getPosts('posts');
        const postsContainer = document.querySelector('#postsContainer');
        drawPostFromFirebase(allPosts, postsContainer, userId);
        postsLogic();
      }
    });
  });

  // Boton editar post
  const editBtn = document.querySelectorAll('.editBtn');
  editBtn.forEach((btn) => {
    btn.addEventListener('click', async (event) => {
      const idPost = event.target.parentElement.parentElement.parentElement.id;
      const post = event.target.parentElement.parentElement.parentElement.children[1].innerText;
      const newPost = prompt('Edita tu post', post);
      if (newPost !== null) {
        await updatePost(idPost, newPost);
        // Volver a dibujar los posts
        const userId = auth.currentUser.uid;
        const allPosts = await getPosts('posts');
        const postsContainer = document.querySelector('#postsContainer');
        drawPostFromFirebase(allPosts, postsContainer, userId);
        postsLogic();
      }
    });
  });
};

const getActualDate = () => {
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  const actualDate = `${day}-${month}-${year}`;
  return actualDate;
};

const getActualHour = () => {
  const date = new Date();
  const hour = date.getHours();
  const minutes = date.getMinutes();
  const actualHour = `${hour}:${minutes}`;
  return actualHour;
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
      date: getActualDate(),
      hour: getActualHour(),
      timestamp: Timestamp.fromDate(new Date()),
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
        const userId = auth.currentUser.uid;
        const allPosts = await getPosts('posts');
        drawPostFromFirebase(allPosts, postsContainer, userId);
        postsLogic();
      } catch (error) {
        console.log(error);
      }
    }
  });
};
