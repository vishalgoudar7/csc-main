import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import {LoadingPlugin} from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';
// import AudioPlayer from './AudioPlayer.vue';
// Vue.component('audio-player', AudioPlayer);

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDtv0fNj2JuvVppvCmyOvZGaqSn8-QPPsk",
  authDomain: "devotee-7c463.firebaseapp.com",
  projectId: "devotee-7c463",
  storageBucket: "devotee-7c463.appspot.com",
  messagingSenderId: "196593785407",
  appId: "1:196593785407:web:2ee5c24de0b8668a46368a",
  measurementId: "G-1NHD2B13X0"
};
initializeApp(firebaseConfig);

const app = createApp(App);


app.use(router);
app.use(store);
app.use(LoadingPlugin);

app.mount('#app');
