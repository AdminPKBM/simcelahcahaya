// js/firebase.js
const firebaseConfig = {
  apiKey: "API_KEY",
  authDomain: "NAMA_PROJECT.firebaseapp.com",
  projectId: "NAMA_PROJECT",
  storageBucket: "NAMA_PROJECT.appspot.com",
  messagingSenderId: "XXXXXX",
  appId: "APP_ID"
};
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
