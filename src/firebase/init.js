/* eslint-disable import/no-unresolved */
// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.16.0/firebase-app.js';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.16.0/firebase-auth.js';
import { getFirestore, collection, addDoc, getDocs, getDoc, query, where, onSnapshot, doc, setDoc } from 'https://www.gstatic.com/firebasejs/9.16.0/firebase-firestore.js'

import { config } from './config.js';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Initialize Firebase
const app = initializeApp(config);

const db = getFirestore(app);

const auth = getAuth();

export {
  config,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  db,
  auth,
  collection, addDoc, getDocs, query, where, onSnapshot,
  doc, getDoc, setDoc
};
