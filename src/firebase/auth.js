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
export const registerFirebase = (email, password) => createUserWithEmailAndPassword(auth, email, password);

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
