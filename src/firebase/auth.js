import {
  signInWithEmailAndPassword,
  // createUserWithEmailAndPassword,
  onAuthStateChanged,
  auth,
  db, doc,
  collection, getDocs, setDoc,
  query, where, signInWithPopup, GoogleAuthProvider, provider,
} from './init.js';

export const loginFirebase = async (email, password) => {
  try {
    return await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    return error.message;
  }
};

// export const registerFirebase = async (email, password) => {
//   try {
//     return await createUserWithEmailAndPassword(auth, email, password);
//   } catch (error) {
//     return error.message;
//   }
// };

export const stateFirebase = async () => {
  let result = '';
  try {
    await onAuthStateChanged(auth, (user) => {
      if (user) {
        result = auth.currentUser.uid;
      } else {
        // console.log('usuario deslogeado');
      }
    });
    return result;
  } catch (error) {
    throw error.message;
  }
};

export const writeUserData = async (id, object) => {
  try {
    const userRef = collection(db, 'user');

    await setDoc(doc(userRef, id), object);

    // const userRef = collection(db, 'users')
    // const docRef = await addDoc(collection(db, 'users'), object);
    // console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    // console.error('Error adding document: ', e);
  }
};

export const readUserData = async () => {
  try {
    const docRef = doc(db, 'users');
    console.log(docRef);
    // const docSnap = await getDoc(docRef);

    // if (docSnap.exists()) {
    //   console.log(docSnap.data());
    // } else {
    //   console.log("No such document!");
    // }
  } catch (error) {
    console.error(error);
  }
};

export const searchNameById = async (id) => {
  const usersRef = collection(db, 'user');
  const q = query(usersRef, where('id', '==', id));
  const querySnapshot = await getDocs(q);

  let userName;

  // eslint-disable-next-line no-shadow
  await querySnapshot.forEach((doc) => {
    userName = doc.data().name;
  });

  return userName;
};

export const launchGoogleLogin = async () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      console.log('token: ', token);
      // The signed-in user info.
      const user = result.user;
      console.log('user: ', user);
      // ...
    }).catch((error) => {
      console.log(error);
      // Handle Errors here.
      // const errorCode = error.code;
      // const errorMessage = error.message;
      // The email of the user's account used.
      // const email = error.customData.email;
      // The AuthCredential type that was used.
      // const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
};
