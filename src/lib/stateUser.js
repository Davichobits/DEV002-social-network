import { stateFirebase, searchByEmail, readUserData } from '../firebase/auth.js';
import { auth } from '../firebase/init.js';


export const stateUser = async () => {
  const newPostLabel = document.querySelector('#newPostLabel');
  // const email = await stateFirebase(auth);
  // const resultReturned = await searchByEmail('prueba8@gmail.com');
  // const objectUser = await readUserData();
  newPostLabel.innerText = `En que estás pensando ${resultReturned}?`;
};
