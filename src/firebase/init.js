/* eslint-disable import/no-unresolved */
// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.20.0/firebase-app.js';
import {
  updateProfile,
  signInWithPopup,
  signInWithRedirect,
  GoogleAuthProvider,
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  getRedirectResult,
} from 'https://www.gstatic.com/firebasejs/9.20.0/firebase-auth.js';
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  getDoc,
  query,
  where,
  onSnapshot,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  arrayUnion,
} from 'https://www.gstatic.com/firebasejs/9.20.0/firebase-firestore.js';

import { config } from './config.js';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Initialize Firebase
const app = initializeApp(config);

const db = getFirestore(app);

const auth = getAuth();

const provider = new GoogleAuthProvider();

// eslint-disable-next-line max-len
const registerFirebase = (email, password) => createUserWithEmailAndPassword(auth, email, password);

export {
  config,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  db,
  auth,
  collection, addDoc, getDocs, query, where, onSnapshot,
  doc, getDoc, setDoc, updateProfile, signInWithRedirect,
  signInWithPopup, GoogleAuthProvider, provider,
  getRedirectResult, updateDoc, arrayUnion,
  registerFirebase, deleteDoc,
};
