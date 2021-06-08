import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCDRC0WjTi6gPSemF3iYXcA6H8c496cDCQ",
  authDomain: "react-app-cursos-22516.firebaseapp.com",
  projectId: "react-app-cursos-22516",
  storageBucket: "react-app-cursos-22516.appspot.com",
  messagingSenderId: "537545313326",
  appId: "1:537545313326:web:7e202c8b896600aff223bf",
};
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { db, googleAuthProvider, firebase };
