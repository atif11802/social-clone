import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC8F9f29seMhEvjukMiesH-5eimjnANXOc",
  authDomain: "instagram-clone-1fe29.firebaseapp.com",
  projectId: "instagram-clone-1fe29",
  storageBucket: "instagram-clone-1fe29.appspot.com",
  messagingSenderId: "264150188208",
  appId: "1:264150188208:web:fcf3393713909a6d723b75",
};



  
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const storage= firebaseApp.storage();

export { db, auth ,storage};
