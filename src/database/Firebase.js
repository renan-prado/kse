// Import the functions you need from the SDKs you need
import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyCb16gD7ST5Sp8eA4cbQsFapCQNQNtLIfw',
  authDomain: 'kse---marketing.firebaseapp.com',
  databaseURL: 'https://kse---marketing-default-rtdb.firebaseio.com',
  projectId: 'kse---marketing',
  storageBucket: 'kse---marketing.appspot.com',
  messagingSenderId: '284546166695',
  appId: '1:284546166695:web:91006c88d17fec1c5d9082',
  measurementId: 'G-DE77R9C0F3',
};

const app = firebase.initializeApp(firebaseConfig);

export default app;
