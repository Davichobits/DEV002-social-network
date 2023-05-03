/* eslint-disable import/no-cycle */
/* eslint-disable no-use-before-define */
import { Home } from './components/Home.js';
import { Register } from './components/Register.js';
import { Login } from './components/Login.js';
import { Profile } from './components/Profile.js';
import { SuccessfullyRegister } from './components/SuccessfullyRegister.js';

import { registerLogic } from './lib/registerLogic.js';
import { loginLogic } from './lib/loginLogic.js';
import { profileLogic } from './lib/profileLogic.js';

const root = document.querySelector('#root');

const routes = {
  '/': Home,
  '/register': Register,
  '/login': Login,
  '/profile': Profile,
  '/success': SuccessfullyRegister,
};

const selectBtns = () => {
  const registerBtn = document.querySelector('#registerBtn');
  const loginBtn = document.querySelector('#loginBtn');
  const returnBtn = document.querySelector('#returnBtn');

  if (registerBtn) {
    registerBtn.addEventListener('click', () => {
      onNavigate('/register');
      // registerLogic();
    });
  }

  if (loginBtn) {
    loginBtn.addEventListener('click', async () => {
      onNavigate('/login');
      // loginLogic();
    });
  }

  if (returnBtn) {
    returnBtn.addEventListener('click', () => {
      onNavigate('/');
    });
  }
};

export const onNavigate = (pathname) => {
  window.localStorage.setItem('state', pathname);
  window.history.pushState(
    {},
    pathname,
    window.location.origin + pathname,
  );
  root.innerHTML = routes[pathname]();
  console.log('estamos aqui: ' + pathname)
  if (pathname === '/login') {
    loginLogic();
  } else if (pathname === '/profile') {
    profileLogic();
  } else if (pathname === '/register') {
    registerLogic();
  }
  selectBtns();
};

root.innerHTML = routes[window.location.pathname]();
selectBtns();

onNavigate(window.localStorage.getItem('state'));
