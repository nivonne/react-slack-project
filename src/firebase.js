import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDMOHpDgrO29nSC4gh2JbRR535gSB3Q5vg",
  authDomain: "react-slack-project-a67fd.firebaseapp.com",
  databaseURL: "https://react-slack-project-a67fd.firebaseio.com",
  projectId: "react-slack-project-a67fd",
  storageBucket: "react-slack-project-a67fd.appspot.com",
  messagingSenderId: "532861473509",
  appId: "1:532861473509:web:b72d256d8ba33bbd04fa0c"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Authorization
export const auth = firebase.auth();

const googleProvider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = () => {
  auth.signInWithPopup(googleProvider);
};