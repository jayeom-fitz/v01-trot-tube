import React, { useState } from "react";

import styled from "styled-components";

import { storeService } from "../../../../fbase";

function UserEdit(props) {
  const [nickname, setNickname] = useState(props.user.nickname);
  const [photoURL, setPhotoURL] = useState(props.user.photoURL);

  const onSubmit = async () => {
    var space = 0;
    for(var i=0; i<nickname.length; i++) {
      if(nickname[i] === ' ') space++;
    } 
    if(nickname === "" || space !== 0 || nickname.length >= 14) return;

    await storeService.collection("users").doc(props.user.uid).update({
      nickname,
      photoURL
    });

    window.location.reload();
  }

  return (
    <Container>
      <Box>
        <Image src={photoURL} alt="" />
      </Box>
      <Box>
        <InputBox>
          <Text>이름</Text>
          <Input value={nickname} onChange={(v) => setNickname(v.target.value)}/>
        </InputBox>

        <InputBox>
          <Text>이미지</Text>
          <Input value={photoURL} onChange={(v) => setPhotoURL(v.target.value)}/>
        </InputBox>

        <InputBox>
          <Button 
            onClick={onSubmit}
            color="#5cb85c">수정</Button>
          <Button
            onClick={props.toggleUserEdit} 
            color="#d9534f">취소</Button>
        </InputBox>
      </Box>
    </Container>
  );
}

export default UserEdit;

const Container = styled.div`
  display: flex;
  align-items: center;
  width: 70%;
  margin: auto;
  margin-top: 50px;
`
const Box = styled.div`
  flex: 0.5;
  text-align: center;
`
const Image = styled.img`
  width: 80%;
  margin: 0 0;
  padding: 10px 10px;
  border: 1px solid lightgrey;
`
const InputBox = styled.div`
  display: flex;
  margin: 20px 10px;
  align-items: center;
`
const Text = styled.h4`
  flex: 0.2;
  text-align: center;
`
const Input = styled.input`
  flex: 0.8;
  height: 35px;
  margin-left: 10px;
  padding-left: 5px;
  border: 1px solid lightgrey;

  &:focus {
    outline: 2px solid #20B2AA;
  }
`
const Button = styled.button`
  width: 75px;
  height: 50px;
  margin: auto;

  border: 1px solid ${(props) => props.color};
  transition-duration: 0.4s;
  background-color: white;

  &:hover {
    color: white;
    background-color: ${(props) => props.color};
  }

  &:focus {
    outline: none;
    color: white;
    background-color: ${(props) => props.color};
  }
`
