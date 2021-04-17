import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import uuid from 'react-uuid'

import styled from "styled-components";

import { storeService } from "src/fbase";

import Avatar from "@material-ui/core/Avatar";

function Write(props) {
  const [secret, setSecret] = useState(false);
  const [content, setContent] = useState('');

  async function writeComment() {
    if(content === '') {
      alert('내용을 작성해주세요'); return;
    }

    const writeData = {
      id: uuid(),
      uid: props.user.uid,
      photoURL: props.user.photoURL,
      nickname: props.user.nickname,
      createdAt: Date.now(),
      content, secret
    };

    await storeService.collection('visits').doc(`${writeData.id}`).set({
      uid: writeData.uid,
      photoURL: writeData.photoURL,
      nickname: writeData.nickname,
      createdAt: writeData.createdAt,
      content, secret
    });

    props.addComment(writeData);
    alert('작성하였습니다.'); setContent('');
  }

  return (
    <Container>
      {props.user && <>
        <Title>
          <StyledLink to={`/user/${props.user.uid}`}>
            <StyledAvatar src={props.user.photoURL}/>
          </StyledLink>
          <StyledLink to={`/user/${props.user.uid}`}>
            <Name>{props.user.nickname}</Name>
          </StyledLink>
          <>
            <input type='checkbox' 
                  onChange={(e) => setSecret(e.target.checked)}/>
            <h4 style={{fontSize:'0.8rem'}}>비밀글</h4>
          </>
          <div style={{paddingLeft:'30px'}}>
            <button onClick={() => writeComment()}>작성하기</button>
          </div>
        </Title>
      </>}
      <Content> 
      {props.user ? <>
        <TextArea value={content} onChange={(e) => setContent(e.target.value)}/>
      </>:<>
        <TextArea readOnly>로그인 후 작성가능합니다.</TextArea>
      </>}
      </Content>
    </Container>
  )
}

export default Write

const Container = styled.div`
  width: 70%;
  margin: 20px auto;
  padding: 10px;
  border: 1px solid grey;
  box-shadow: 5px 5px 5px 5px grey;
`
const Title = styled.div`
  display: flex;
  align-items: center;
`
const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
`
const StyledAvatar = styled(Avatar)`
  height: 80px !important;
  width: 80px !important;
  margin: 10px 30px;
  border: 1px solid grey;
`
const Name = styled.h3`
  padding: 0 30px;
`
const Content = styled.div`
  margin: 0 30px;
`
const TextArea = styled.textarea`
  width: 100%;
  height: 100px;
  resize: none;
  padding: 10px;
`