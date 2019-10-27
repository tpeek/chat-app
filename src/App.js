import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import Nav from './Nav';
import Channel from './Channel';
import { firebase, db } from './firebase';

const useAuth = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    return firebase.auth().onAuthStateChanged(firebaseUser => {
      if (firebaseUser) {
        const user = {
          displayName: firebaseUser.displayName,
          photoURL: firebaseUser.photoURL,
          uid: firebaseUser.uid,
          isOnline: true,
        };
        setUser(user);
        db.collection('users')
          .doc(user.uid)
          .set(user, { merge: true });
      } else {
        setUser(null);
      }
    });
  }, []);

  return user;
};

const Login = () => {
  const [authError, setAuthError] = useState(null);

  const handleSignIn = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    try {
      await firebase.auth().signInWithPopup(provider);
    } catch (error) {
      setAuthError(error);
    }
  };

  return (
    <div className="Login">
      <h1>Chat!</h1>
      <button onClick={handleSignIn}>Sign in with Google</button>
      {authError && (
        <div>
          <p>Sorry, there was a problem.</p>
          <p className="Error">{authError.message}</p>
          <p>Please try again.</p>
        </div>
      )}
    </div>
  );
};

function App() {
  const user = useAuth();

  return (
    <BrowserRouter>
      {user ? (
        <div className="App">
          <Nav user={user} />
          <Switch>
            <Route path="/channel/:channelId">
              <Channel user={user} />
            </Route>
            <Redirect to="/channel/general" />
          </Switch>
        </div>
      ) : (
        <Login />
      )}
    </BrowserRouter>
  );
}

export default App;
