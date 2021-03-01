import React, { useState } from 'react'

import styled from 'styled-components'

import { storeService } from "src/fbase"

import { ImCross } from 'react-icons/im'
import Avatar from '@material-ui/core/Avatar'

function PeopleAdd(props) {
  const [pid, setPid] = useState('');
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [birth, setBirth] = useState('');
  const [company, setCompany] = useState('');
  
  const onSubmit = async () => {
    if(!(props.edit || pid) || !image || !name || !birth || !company) {
      alert('모든 값을 입력하세요.'); return;
    }
    
    const docRef = storeService.collection('people').doc(pid);

    await docRef.get().then(function(doc) {
      if (doc.exists) {
        alert("중복된 아이디입니다.");
      } else {
        docRef.set({
          name, image, birth, company,
          likes : 0
        });
        props.valueUp();
      }
    }).catch(function(error) {
      alert("Error getting document:", error);
    });

    setPid(''); setName(''); setImage(''); setBirth(''); setCompany('');
    document.getElementById("personEdit").style.right = "-800px";
  }

  return (
    <Body id='personEdit'>
      <Container>
        <CloseBar>
          <CloseIcon onClick={() => {
            document.getElementById("personEdit").style.right = "-800px";
          }}/>
        </CloseBar>
        

        <div style={{display: 'flex'}}>
          <Title style={{flex: '0.7'}}>인물 생성</Title>
          <InputBox style={{flex: '0.3'}}>
            <Button onClick={onSubmit}>생성</Button>
          </InputBox>
        </div>

        <BoxContainer>
          <Box flex='0.3'>
            <StyledAvatar src={image} alt="" />
          </Box>

          <Box flex='0.7'>
            <InputBox>
              <Text>아이디</Text>
              <Input value={pid} onChange={(v) => setPid(v.target.value)}/>
            </InputBox>

            <InputBox>
              <Text>이름</Text>
              <Input value={name} onChange={(v) => setName(v.target.value)}/>
            </InputBox>

            <InputBox>
              <Text>이미지</Text>
              <Input value={image} onChange={(v) => setImage(v.target.value)}/>
            </InputBox>

            <InputBox>
              <Text>생년월일</Text>
              <Input value={birth} type="number" onChange={(v) => setBirth(v.target.value)}/>
            </InputBox>

            <InputBox>
              <Text>소속사</Text>
              <Input value={company} onChange={(v) => setCompany(v.target.value)}/>
            </InputBox>
          </Box>
        </BoxContainer>
      </Container>
    </Body>
  )
}

export default PeopleAdd

const Body = styled.div`
  height: 100%;
  width: 800px;
  position: fixed;
  z-index: 1;
  top: 0;
  right: -800px;
  background-color: #ccc;
  overflow-x: hidden;
  transition: 0.5s;

  ::-webkit-scrollbar {
    display: none;
  }
`
const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px;
`
const CloseBar = styled.div`
  text-align: left;
`
const CloseIcon = styled(ImCross)`
  color: black;
  cursor: pointer;
`
const Title = styled.h2`
  text-align: center;
  padding-bottom: 20px;
`

const BoxContainer = styled.div`
  display: flex;
  align-items: center;
  width: 90%;
  margin: auto;
`
const Box = styled.div`
  flex: ${(props) => props.flex};
  text-align: center;
`
const StyledAvatar = styled(Avatar)`
  width: 200px !important;
  height: 200px !important;
  margin: auto;
`
const InputBox = styled.div`
  display: flex;
  align-items: center;
`
const Text = styled.h4`
  flex: 0.2;
  text-align: center;
  margin: 10px 0;
`
const Input = styled.input`
  flex: 0.8;
  height: 30px;
  margin: 10px 10px;
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
  border: none;
  transition-duration: 0.4s;
  background-color: #00C851;

  &:hover {
    color: white;
    background-color: #007E33;
  }
`
