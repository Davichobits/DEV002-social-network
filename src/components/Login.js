export const Login = () => (`
  <section class='max-w-md m-auto p-4'>
    <h1 class="text-2xl font-bold text-center my-6">Ingresa aquí:</h1>
    <form class='flex flex-col items-end' id="form" action="">
      <input class='rounded-lg my-2 w-full' type="email" placeholder="correo">
      <input class='rounded-lg my-2 w-full' type="password" placeholder="contraseña">
      <div id="error"></div>
      <input class="bg-red-600 hover:bg-red-500 cursor-pointer text-white w-24 rounded-lg py-1 text-center" id="loginBtnView" type="submit" value="Ingresa">
    </form><br>
    <div class='flex place-content-around max-w-sm mx-auto my-6'>
      <button class="bg-green-600 hover:bg-green-500 text-white w-48 rounded-lg text-center flex place-content-around p-2 " id="loginGoogleBtn">
        <img class='w-6' src='../img/google.png' alt='icon' />
        Ingresa con Google
      </button>
      <button class="bg-green-600 hover:bg-green-500 text-white w-20 rounded-lg text-center" id="returnBtn">Volver</button>
    </div>
  </section>
  `);
