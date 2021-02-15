import React from 'react'

import styled from 'styled-components';

import { authService, firebaseInstance, storeService } from '../fbase'

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
        verified : 0,
      });
    }   
  }
  
  if(authService.currentUser != null) {
    window.history.back(); return <></>;
  }

  return (
    <Container>
      <Box>
        <Logo 
          className="login__boxImage"
          src="/images/logo-trottube.png" 
          alt="" 
         />

        <Button 
          onClick={onSocialClick} name="google"
          style={{color:'black', backgroundColor:'white'}}>
          <FcGoogle size='18' style={{width:'40px'}}/>
          <span>구글 로그인</span>
        </Button>
        <Button 
          onClick={onSocialClick} name="github"
          style={{color:'white', backgroundColor:'black'}}>
          <AiFillGithub size='18' style={{width:'40px'}}/>
          <span>깃허브 로그인</span>
        </Button>
      </Box>
    </Container>
  )
}

export default Login

const Container = styled.div`
  display: flex;
  min-width: 360px;
  width: 100%;
  height: 100vh;
  align-items: center;
  background-color: crimson;
`
const Box = styled.div`
  min-width: 360px;
  width: 50%;
  height: 50%;
  border: 1px solid lightgray;
  margin: auto;
  background-color: white;
  box-shadow: 0px 0px 5px 2px lightgray;
`
const Logo = styled.img`
  display: block;
  max-width: 360px;
  width: 80%;
  margin: auto;
`
const Button = styled.button`
  display: block;
  width: 80%;
  height: 40px;
  margin: auto;
  margin-bottom: 10px;
  align-items: center;
  font-size: 18px;
  cursor: pointer;
`