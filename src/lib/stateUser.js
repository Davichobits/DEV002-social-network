import { stateFirebase } from '../firebase/auth.js';
import { auth } from '../firebase/init.js';

export const stateUser = async () => {
  const newPostLabel = document.querySelector('#newPostLabel');
  const user = await stateFirebase(auth);
  newPostLabel.innerText = `En que estás pensando ${user}?`;
};
