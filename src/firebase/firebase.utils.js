import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyBE6lARPlde5V2lkue9CVa5wIPCktbEz-g",
  authDomain: "crwn-db-85012.firebaseapp.com",
  databaseURL: "https://crwn-db-85012.firebaseio.com",
  projectId: "crwn-db-85012",
  storageBucket: "crwn-db-85012.appspot.com",
  messagingSenderId: "912763257466",
  appId: "1:912763257466:web:7cb7206423cc3ebab331c3",
  measurementId: "G-E6JK2M6JCQ",
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
