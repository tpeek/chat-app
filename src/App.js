import React, { useState, useEffect } from 'react';

import Nav from './Nav';
import Channel from './Channel';
import { firebase } from './firebase';

const handleSignIn = async () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  await firebase.auth().signInWithPopup(provider);
};

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    return firebase.auth().onAuthStateChanged(user => {
      if (user) {
        setUser({ displayName: user.displayName, photoURL: user.photoURL, uid: user.uid });
      } else {
        setUser(null);
      }
    });
  });

  return user ? (
    <div className="App">
      <Nav user={user} />
      <Channel />
    </div>
  ) : (
    <div className="Login">
      <h1>Chat!</h1>
      <button onClick={handleSignIn}>Sign in with Google</button>
    </div>
  );
}

export default App;
