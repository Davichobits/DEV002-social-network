import { signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, auth } from './init.js';

export const loginFirebase = async (email, password) => {
  try {
    return await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    return error.message;
  }
};

export const registerFirebase = async (email, password) => {
  try {
    return await createUserWithEmailAndPassword(auth, email, password);
  } catch (error) {
    return error.message;
  }
};

export const stateFirebase = async () => {
  let result = '';
  try {
    await onAuthStateChanged(auth, (user) => {
      if (user) {
        result = auth.currentUser.email;
      } else {
        console.log('usuario deslogeado');
      }
    });
    return result;
  } catch (error) {
    throw error.message;
  }
};
