import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyDeWjv1Z5kZlacdv3JF4Tgw8r93W3gC-i0',
  authDomain: 'crwn-db-clothing.firebaseapp.com',
  databaseURL: 'https://crwn-db-clothing.firebaseio.com',
  projectId: 'crwn-db-clothing',
  storageBucket: 'crwn-db-clothing.appspot.com',
  messagingSenderId: '438589752763',
  appId: '1:438589752763:web:1db07bc60e3ca2e136709e',
  measurementId: 'G-30F3L05G1T'
};

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
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
