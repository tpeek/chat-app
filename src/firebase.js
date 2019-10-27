import firebase from 'firebase/app';
import 'firebase/analytics';
import 'firebase/auth';
import 'firebase/database';
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
export const rtdb = firebase.database();

export const setupPresence = user => {
  const isOfflineForRTDB = {
    state: 'offline',
    lastChanged: firebase.database.ServerValue.TIMESTAMP,
  };
  const isOnlineForRTDB = {
    state: 'online',
    lastChanged: firebase.database.ServerValue.TIMESTAMP,
  };

  const isOfflineForFirestore = {
    state: 'offline',
    lastChanged: firebase.firestore.FieldValue.serverTimestamp(),
  };
  const isOnlineForFirestore = {
    state: 'online',
    lastChanged: firebase.firestore.FieldValue.serverTimestamp(),
  };

  const rtdbRef = rtdb.ref(`/status/${user.uid}`);
  const userDoc = db.doc(`/users/${user.uid}`);

  rtdb.ref('.info/connected').on('value', async snapshot => {
    if (snapshot.val()) {
      await rtdbRef.onDisconnect().set(isOfflineForRTDB);
      rtdbRef.set(isOnlineForRTDB);
      userDoc.update({
        status: isOnlineForFirestore,
      });
    } else {
      userDoc.update({
        status: isOfflineForFirestore,
      });
    }
  });
};

export { firebase };
