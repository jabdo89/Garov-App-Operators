import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyA4qFv0IwSgRr6Kk9NLtHCRPxKPlUbpzzI',
  authDomain: 'passeio-a1488.firebaseapp.com',
  projectId: 'passeio-a1488',
  storageBucket: 'passeio-a1488.appspot.com',
  messagingSenderId: '891098839887',
  appId: '1:891098839887:web:5124ae0960c5c39939233a',
  measurementId: 'G-83SXNCRXDP',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const { auth, firestore: db } = firebase;

export { auth, db };
