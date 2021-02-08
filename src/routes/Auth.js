import React from 'react'

import { authService, firebaseInstance } from '../fbase'

function Auth() {
  const onSocialClick = async (e) => {
    const {
      target: {name},
    } = e;
    let provider;
    if (name === "google") {
      provider = new firebaseInstance.auth.GoogleAuthProvider();
    } else if (name === "github") {
      provider = new firebaseInstance.auth.GithubAuthProvider();
    }
    const data = await authService.signInWithPopup(provider);
    console.log(data.additionalUserInfo);
  }
  
  return (
    <div style={{width:'100%', minWidth:'360px', height:'100%', minHeight:'680px'}}>
      <div style={{width:'20%', height:'50%', alignItems:'center'}}>
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

export default Auth
