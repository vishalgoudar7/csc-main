// firebase.js
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDtv0fNj2JuvVppvCmyOvZGaqSn8-QPPsk",
  authDomain: "devotee-7c463.firebaseapp.com",
  projectId: "devotee-7c463",
  storageBucket: "devotee-7c463.appspot.com",
  messagingSenderId: "196593785407",
  appId: "1:196593785407:web:2ee5c24de0b8668a46368a",
  measurementId: "G-1NHD2B13X0",
};

firebase.initializeApp(firebaseConfig); 

export default firebase;
