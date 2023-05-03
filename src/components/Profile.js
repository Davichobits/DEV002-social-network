export const Profile = () => {
  const imageProfie = localStorage.getItem('photoURL');

  return `<img src="${imageProfie}" alt="perfil" id="profileImg">
  <label for="newPost" id="newPostLabel" >En que estas pensando? </label><br><br>
  <textarea id="newPost" name="" id="" cols="55" rows="5"></textarea>
  <button>Publicar</button>
  <section id="postContainer"></section>
  <button id="closeSesion">Cerrar Sesion</button>
  `;
};
