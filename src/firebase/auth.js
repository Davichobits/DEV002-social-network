import { signInWithEmailAndPassword, createUserWithEmailAndPassword, auth } from './init.js';

export const loginFirebase = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    throw error.message;
  }
};

export const registerFirebase = async (email, password) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
  } catch (error) {
    return error.message;
  }
};
