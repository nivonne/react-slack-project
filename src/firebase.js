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
export const firestore = firebase.firestore();

//Initialize google provider
const googleProvider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = () => {
  auth.signInWithPopup(googleProvider); //ask user to select gmail account in a new popup
};

export const signOut = () => {
  auth.signOut();
};

export const createOrGetUserProfileDocument = async (user) => {
  if (!user) return;

  // check if a the user doc is there in DB with
  const userRef = firestore.doc(`users/${user.uid}`);
  const snapshot = await userRef.get();

  // if no user exists in DB @ path 'userRef' then go and make one
  if (!snapshot.exists) {
    const { displayName, email, photoURL } = user;

    try {
      const user = {
        display_name: displayName,
        email,
        photo_url: photoURL,
        created_at: new Date(),
      };
      await userRef.set(user);
    } catch (error) {
      console.log('Error', error);
    }
  }

  return getUserDocument(user.uid);
};

async function getUserDocument(uid) {
  if (!uid) return null;

  try {
    const userDocument = await firestore.collection('user').doc(uid);
    return userDocument;
  } catch(error) {
    console.error('Error in getUserDocument', error.message);
  }
}


