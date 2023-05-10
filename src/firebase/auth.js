import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithRedirect,
  onAuthStateChanged,
  auth,
  db, doc,
  collection, getDocs, setDoc, getDoc,
  query, where, signInWithPopup, provider, updateDoc, arrayUnion,
  deleteDoc, orderBy,
} from './init.js';

export const loginFirebase = async (email, password) => {
  try {
    return await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    return error.message;
  }
};

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
  } catch (e) {
    // console.error('Error adding document: ', e);
  }
};

export const readUserData = async () => {
  try {
    const docRef = doc(db, 'users');
    console.log(docRef);
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

export const launchGoogleLogin = () => signInWithPopup(auth, provider);
export const launchGoogleRegister = () => signInWithRedirect(auth, provider);

// FIREBASE

export const savePost = (post) => setDoc(doc(collection(db, 'posts')), post);

export const getPosts = (userID) => getDocs(query(collection(db, userID), orderBy('timestamp', 'desc')));

export const updateNumberOfLikes = async (userID, idPost) => {
  // Referencia del post
  const postRef = doc(db, 'posts', idPost);
  // Obtener el post con el id
  const docSnap = await getDoc(postRef);
  if (docSnap.exists()) {
    const postObject = docSnap.data();
    // Actualizar el numero de likes de ese post
    if (!postObject.likes.includes(userID)) {
      updateDoc(postRef, {
        ...postObject,
        likes: arrayUnion(userID),
      });
    } else {
      // Quito el id del usuario que ya le ha dado like
      const arrayWithoutLike = postObject.likes.filter((like) => like !== userID);
      updateDoc(postRef, {
        ...postObject,
        likes: arrayWithoutLike,
      });
    }
  }
};

export const deletePost = (idPost) => {
  const postRef = doc(db, 'posts', idPost);
  deleteDoc(postRef);
};

export const updatePost = async (idPost, newPost) => {
  // Referencia del post
  const postRef = doc(db, 'posts', idPost);
  // Obtener el post con el id
  const docSnap = await getDoc(postRef);
  if (docSnap.exists()) {
    const postObject = docSnap.data();
    // Actualizar el numero de likes de ese post
    updateDoc(postRef, {
      ...postObject,
      post: newPost,
    });
  }
};

export const registerFirebase = (email, password) => createUserWithEmailAndPassword(auth, email, password);