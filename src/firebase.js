import firebase from 'firebase/app';
import 'firebase/analytics';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCdvCD8KaOEBc6b1_fm6KOb6chLh_nin_k',
  authDomain: 'chat-app-c8e6a.firebaseapp.com',
  databaseURL: 'https://chat-app-c8e6a.firebaseio.com',
  projectId: 'chat-app-c8e6a',
  storageBucket: 'chat-app-c8e6a.appspot.com',
  messagingSenderId: '836750389521',
  appId: '1:836750389521:web:8df1c1e8309adfe6eb1cb0',
  measurementId: 'G-CV8C7DT5PS',
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

export const db = firebase.firestore();
