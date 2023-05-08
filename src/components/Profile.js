export const Profile = () => `
  <section class='max-w-md m-auto px-4'>
    <section class='sticky top-0 bg-white py-2'>
      <div class='flex items-end place-content-between mb-2 mt-1'>
        <label for="newPost" id="newPostLabel" >En que estas pensando? </label><br><br>
        <div class='flex flex-col items-end'>
          <img class='rounded-full w-16 my-1' src="" alt="perfil" id="profileImg">
          <button class="bg-red-600 hover:bg-red-500 text-white w-28 rounded-lg text-center" id="closeSesion">Cerrar Sesion</button>
        </div>
      </div>
      <textarea class='w-full' id="newPost" name="" id="" cols="55" rows="4"></textarea>
      <div class='flex place-content-end'>
        <button class="bg-green-600 hover:bg-green-500 cursor-pointer text-white w-24 rounded-lg py-1 text-center" id="postBtn">Publicar</button>
      </div>
    </section>
    <section id="postsContainer"></section>
    
  </section>
`;
