import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  auth,
  db, doc,
  collection, addDoc, getDocs, getDoc, setDoc,
  query, where, onSnapshot,
} from './init.js';

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

export const writeUserData = async (id, object) => {
  try {
    const userRef = collection(db, "user");

    await setDoc(doc(userRef, id), object);

    // const userRef = collection(db, 'users')
    // const docRef = await addDoc(collection(db, 'users'), object);
    // console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
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
    console.error(error)
  }
};

export const searchByEmail = async (email) => {
  const usersRef = collection(db, "users");
  const querResult = query(usersRef, where("email", "==", email));
  let result = await onSnapshot(
    querResult,
    (querySnapshot) => {
      result = JSON.stringify(querySnapshot.docs.map((e)=>e.data().name));
      return result;
    });
  console.log(`El resultado de buscar la data de este correo: ${email} es: ${result}`);
};
