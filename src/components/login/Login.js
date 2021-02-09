import React from 'react'
import './Login.css'

import { authService, firebaseInstance, storeService } from '../../fbase'

import { FcGoogle } from 'react-icons/fc'
import { AiFillGithub } from 'react-icons/ai'

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
        verified : false,
      });
    }   
  }
  
  if(authService.currentUser != null) {
    window.history.back(); return <></>;
  }

  return (
    <div className='login__back'>
      <div className='login__box'>
        <img 
          className="login__boxImage"
          src="/images/logo-trottube.png" 
          alt="" 
         />

        <button 
          className="login__boxButton login__forGoogle" 
          onClick={onSocialClick} name="google">
          <FcGoogle size='18'className="login__buttonIcon"/>
          <span>구글 로그인</span>
        </button>
        <button 
          className="login__boxButton login__forGitHub" 
          onClick={onSocialClick} name="github">
          <AiFillGithub size='18' className="login__buttonIcon"/>
          <span>깃허브 로그인</span>
        </button>
        
      </div>
    </div>
  )
}

export default Login
