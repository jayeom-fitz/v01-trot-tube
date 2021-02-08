import React from 'react'
import './Login.css'
import { useHistory } from 'react-router-dom'

import { authService, firebaseInstance, storeService } from '../../fbase'

function Login() {
  const onSocialClick = async (e) => {
    const {target: {name},} = e;

    let provider;
    if (name === "google") {
      provider = new firebaseInstance.auth.GoogleAuthProvider();
    } else if (name === "github") {
      provider = new firebaseInstance.auth.GithubAuthProvider();
    }

    const data = await authService.signInWithPopup(provider);

    if(data.additionalUserInfo.isNewUser) {
      await storeService.collection("users").doc(data.user.uid).set({
        nickname : data.user.displayName,
        photoURL : data.user.photoURL,
        joinDate : Date.now(),
      });
    }   
  }
  
  if(authService.currentUser != null) {
    window.history.back(); return <></>;
  }

  return (
    <div className='login'>
      <div className='login__Box'>
        <div>
          <button onClick={onSocialClick} name="google">
            Continue with Google
          </button>
          <button onClick={onSocialClick} name="github">
            Continue with Github
          </button>
        </div>
      </div>
    </div>
  )
}

export default Login
