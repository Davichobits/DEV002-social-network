import { Home } from "./components/Home.js"
import { Register } from "./components/Register.js"
import { Login } from "./components/Login.js"
import { Profile } from "./components/Profile.js"

import { registerFirebase, loginFirebase } from "./firebase/auth.js"

const root = document.querySelector("#root")

const routes = {
  '/': Home,
  '/register': Register,
  '/login': Login,
  '/profile': Profile
}

export const onNavigate = (pathname) => {
  window.history.pushState(
    {}, 
    pathname, 
    window.location.origin + pathname
  )
  root.innerHTML = routes[pathname]()
  selectBtns()
}

root.innerHTML = routes[window.location.pathname]()
selectBtns()

function selectBtns(){
  const registerBtn = document.querySelector('#registerBtn');
  const loginBtn = document.querySelector('#loginBtn');
  const returnBtn = document.querySelector('#returnBtn');

  if(registerBtn){
    registerBtn.addEventListener('click', ()=>{
      onNavigate('/register')
      registerUser()
    });  
  }

  if(loginBtn){
    loginBtn.addEventListener('click', ()=>{
      onNavigate('/login')
      registerUser()
    });  
  }

  if(returnBtn){
    returnBtn.addEventListener('click', ()=>{
      onNavigate('/')
    })
  }
}

function registerUser(){
  const form = document.querySelector("#form");
  const errorDiv = document.querySelector("#error")

  form.addEventListener('submit', async (event)=>{
    event.preventDefault();
    const email = event.target[0].value;
    const password = event.target[1].value;

    const result = await registerFirebase(email, password)

    if(result === 'Firebase: Error (auth/email-already-in-use).'){
      errorDiv.innerText = 'Correo ya existe';
    }else if(result === 'Firebase: Password should be at least 6 characters (auth/weak-password).'){
      errorDiv.innerText = 'La clave debe tener al menos 6 caracteres';
    }else if(result === 'Firebase: Error (auth/internal-error).'){
      errorDiv.innerText = 'Por favor llena todos los campos';
    }else{
      errorDiv.innerText = 'correo creado exitosamente';
    }

  })
}