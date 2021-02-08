import React, { useState, useEffect } from 'react';

import AppRouter from './Router'

import firebase from 'firebase'

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [userObj, setUserObj] = useState(firebase.auth().currentUser);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(function(user) {
      if(user) {
        const userObject = {
          uid : user.uid,
          name : user.displayName,
          image : user.photoURL
        };
        setUserObj(userObject);
      } 
      setIsLoaded(true);
    });
  }, []);

  return (
    <>
      {isLoaded ? <AppRouter user={userObj} /> 
        : null}
    </>
  );
}

export default App;
