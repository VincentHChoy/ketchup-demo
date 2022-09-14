// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
// import { collection, getDocs } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCHYJYYp5JIORcHCZmA1G1QXVeihuOvzls",
  authDomain: "forest-6c6a9.firebaseapp.com",
  databaseURL: "https://forest-6c6a9-default-rtdb.firebaseio.com",
  projectId: "forest-6c6a9",
  storageBucket: "forest-6c6a9.appspot.com",
  messagingSenderId: "974636094614",
  appId: "1:974636094614:web:731781a021724ba39adeb7",
  measurementId: "G-LTR1N6E6VB",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const firebaseApp = firebase.initializeApp(firebaseConfig);
const auth = firebaseApp.auth();
const firestore = firebaseApp.firestore();

const firestoreDB = {
  posts: firestore.collection("users"),
  getCurrentTimestamp: firebase.firestore.FieldValue.serverTimestamp,
};


export { firestore, auth, firebase};
