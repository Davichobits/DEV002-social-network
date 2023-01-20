import { Home } from "./components/Home.js"
import { Register } from "./components/Register.js"
import { Login } from "./components/Login.js"
import { Profile } from "./components/Profile.js"

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
  console.log(routes[pathname])
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
      console.log('registro')
      onNavigate('/register')
    });  
  }

  if(loginBtn){
    loginBtn.addEventListener('click', ()=>{
      console.log('login')
      onNavigate('/login')
    });  
  }

  if(returnBtn){
    returnBtn.addEventListener('click', ()=>{
      console.log('regresar')
      onNavigate('/')
    })
  }
}