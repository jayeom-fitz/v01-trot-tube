import React, { useState } from 'react'

import styled from 'styled-components';

import { storeService } from "src/fbase";

import { ImCross } from 'react-icons/im'

const TvProgramAdd = (props) => {
  const [pid, setPid] = useState('');
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [year, setYear] = useState('');
  const [channel, setChannel] = useState('');
  
  const onSubmit = async () => {
    if(!(props.edit || pid) || !image || !title || !year || !channel) {
      alert('모든 값을 입력하세요.'); return;
    }
    
    const docRef = storeService.collection('tv-programs').doc(pid);
 
    await docRef.get().then(function(doc) {
      if (doc.exists) {
        alert("중복된 아이디입니다.");
      } else {
        docRef.set({
          title, image, year, channel,
          likes : 0, 
          sliderIndex : 0
        });
      }
    }).catch(function(error) {
      alert("Error getting document:", error);
    });

    document.getElementById("tvEdit").style.display = "none";
    props.valueUp();
  }

  return (
    <Body id='tvEdit'>
      <Container>
        <Content>
          <CloseBar>
            <CloseIcon onClick={() => {
              document.getElementById("tvEdit").style.display = "none";
            }}/>
          </CloseBar>
          
          <Title>TV 프로그램 생성</Title>

          <BoxContainer>
            <Box>
              <Image src={image} alt="" />
            </Box>

            <Box>
              <InputBox>
                <Text>아이디</Text>
                <Input value={pid} onChange={(v) => setPid(v.target.value)}/>
              </InputBox>

              <InputBox>
                <Text>제목</Text>
                <Input value={title} onChange={(v) => setTitle(v.target.value)}/>
              </InputBox>

              <InputBox>
                <Text>이미지</Text>
                <Input value={image} onChange={(v) => setImage(v.target.value)}/>
              </InputBox>

              <InputBox>
                <Text>방송사</Text>
                <Input value={channel} onChange={(v) => setChannel(v.target.value)}/>
              </InputBox>

              <InputBox>
                <Text>방송년도</Text>
                <Input value={year} type="number" onChange={(v) => setYear(v.target.value)}/>
              </InputBox>

            </Box>
          </BoxContainer>

          <InputBox>
            <Button onClick={onSubmit}>생성</Button>
          </InputBox>
        </Content>
      </Container>
    </Body>
  )
}

export default TvProgramAdd

const Body = styled.div`
  display: none;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, .7);
  z-index: 1;
`
const Container = styled.div`
  width: 70%;
  height: 90%;
  background-color: white;
`
const Content = styled.div`
  padding: 20px;
`
const CloseBar = styled.div`
  text-align: right;
  margin-bottom: 20px;
`
const CloseIcon = styled(ImCross)`
  color: black;
  cursor: pointer;
`
const Title = styled.h1`
  text-align: center;
`
const BoxContainer = styled.div`
  display: flex;
  align-items: center;
  width: 90%;
  margin: auto;
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