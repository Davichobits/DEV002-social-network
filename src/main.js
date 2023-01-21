/* eslint-disable no-use-before-define */
import { Home } from './components/Home.js';
import { Register } from './components/Register.js';
import { Login } from './components/Login.js';
import { Profile } from './components/Profile.js';
import { registerUser } from './lib/registerUser.js';
import { loginUser } from './lib/loginUser.js';

const root = document.querySelector('#root');

const routes = {
  '/': Home,
  '/register': Register,
  '/login': Login,
  '/profile': Profile,
};

const selectBtns = () => {
  const registerBtn = document.querySelector('#registerBtn');
  const loginBtn = document.querySelector('#loginBtn');
  const returnBtn = document.querySelector('#returnBtn');
  const loginBtnView = document.querySelector('#loginBtnView')

  if (registerBtn) {
    registerBtn.addEventListener('click', () => {
      onNavigate('/register');
      registerUser();
    });
  }

  if (loginBtn) {
    loginBtn.addEventListener('click', async () => {
      onNavigate('/login');
    });
  }

  if (loginBtnView) {
    loginBtnView.addEventListener('click', () => {
      loginUser();
    });
  }

  if (returnBtn) {
    returnBtn.addEventListener('click', () => {
      onNavigate('/');
    });
  }
};

export const onNavigate = (pathname) => {
  window.history.pushState(
    {},
    pathname,
    window.location.origin + pathname,
  );
  root.innerHTML = routes[pathname]();
  selectBtns();
};

root.innerHTML = routes[window.location.pathname]();
selectBtns();
