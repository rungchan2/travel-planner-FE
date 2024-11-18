// auth.js
import { getAuth, signInWithPopup, GoogleAuthProvider, setPersistence, browserSessionPersistence } from 'firebase/auth';
import {app} from './firebaseConfig';
import firebase from "firebase/compat/app";
import Persistence = firebase.auth.Auth.Persistence;


const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export const loginSession = () => {

}

export const signInWithGoogle = async () => {

  setPersistence(auth, browserSessionPersistence)
  .then(() => {
    return signInWithPopup(auth, provider);
  })
  .catch((error) => {
    console.error("에러발생 했습니다. : ", error);
  })
};


export const signOut = () => {
  return auth.signOut();
};

export default auth;
