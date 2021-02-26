import React from 'react'

import { authService } from 'src/fbase' 

import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Avatar from "@material-ui/core/Avatar";

function UserIcon(props) { 
  const onIconClick = () => {
    const ref = document.getElementById("userIcon__dropdown");
    
    if(ref.style.display === 'none' || ref.style.display === '') {
      ref.style.display='block';
    } else {
      ref.style.display='none';
    }
  }

  const onLinkClick = () => {
    if(document.getElementById("userIcon__dropdown") == null) return;

    document.getElementById("userIcon__dropdown").style.display='none';
  }

  return (
    <>
      {props.user ? (
        <Container>
          <Avatar 
            onClick={() => onIconClick()}
            src={props.user.photoURL}
            alt=""
            style={{cursor:'pointer', border:'1px solid lightgrey'}}
          />

          <Dropdown id="userIcon__dropdown">
            <Link 
              to={`/user/${props.user.uid}`} style={{textDecoration:'none'}}
              onClick={onLinkClick()}>
              <Content className="userIcon__content">내 정보</Content>
            </Link>
            <Content
              onClick={() => {
                onLinkClick();
                authService.signOut();
                window.location.reload();
              }}
            >로그아웃</Content>
          </Dropdown>
        </Container>
      ) : (
        <Link to='/login' style={{textDecoration:'none'}}>
          <LoginBox>로그인</LoginBox>
        </Link>
      )}
    
    </>
  )
}

export default UserIcon

const Container = styled.div`
  position: relative;
  display: inline-block;
`
const Dropdown = styled.div`
  display: none;
  position: absolute;
  right:0;
  background-color: #f1f1f1;
  min-width: 160px;
  border: 1px solid lightgray;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
`
const Content = styled.span`
  color: black;
  padding: 6px 8px;
  text-decoration: none;
  display: block;
  text-align: center;

  &:hover {
    background-color: lightgray;
  }
`
const LoginBox = styled.div`
  padding: 6px 8px;
  color: blueviolet;
  border: 1px solid blueviolet;
  cursor: pointer;
`