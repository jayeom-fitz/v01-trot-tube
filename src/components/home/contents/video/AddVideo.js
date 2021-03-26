import React, { useState } from 'react'
import { useParams } from "react-router-dom";

import styled from 'styled-components'

import { storeService } from "src/fbase"

import { ImCross } from 'react-icons/im'

function AddVideo(props) {
  const { tpid } = useParams();

  const [vid, setVid] = useState('');
  const [song, setSong] = useState('');

  const onSaveClick = async () => {
    if(!vid || !song) {
      alert('모든 값을 입력하세요.'); return;
    } 

    const docRef = storeService.collection('videos').doc(vid);
    const ppRef = storeService.collection('people').doc(props.person.id);

    await docRef.get().then(function(doc) {
      if (!doc.exists) {
        docRef.set({
          tpid, song,
          likes : 0,
          createdAt : Date.now()
        }); 
      }

      docRef.collection('singer').doc(props.person.id).get().then(function (person) {
        if(person.exists) {
          alert('이미 존재하는 영상입니다.'); return;
        }

        docRef.collection('singer').doc(props.person.id).set({
          name: props.person.name
        })

        ppRef.collection('videos').doc(vid).set({
          song, tpid,
          createdAt : Date.now(),
        })
      })
    }).catch(function(error) {
      alert("Error getting document:", error);
    });

    document.getElementById("addVideo").style.right = "-50%";
  }

  return (
    <Container id='addVideo'>
      <Body>
        <Header>
          <CloseBar>
            <CloseIcon onClick={() => {
              document.getElementById("addVideo").style.right = "-50%";
            }}/>
          </CloseBar>
        </Header>
        
        <Content>
          <InputBox>
            <Text>TV 프로그램 ID :</Text><Text>{tpid}</Text>
          </InputBox>
          <InputBox>
            <Text>Person ID :</Text><Text>{props.person.id}</Text>
          </InputBox>

          <InputBox>
            {vid &&
              <Image 
                src={`http://img.youtube.com/vi/${vid}/0.jpg`}
              />
            }
          </InputBox>

          <InputBox>
            <Text>영상 ID</Text>
            <Input value={vid} onChange={(v) => setVid(v.target.value)}/>
          </InputBox>
          <InputBox>
            <Text>곡명</Text>
            <Input value={song} onChange={(v) => setSong(v.target.value)}/>
          </InputBox>
        </Content>

        <div style={{textAlign:'center', paddingTop:'30px'}}>
          <Button onClick={onSaveClick}>
            저장
          </Button>
        </div>
      </Body>
    </Container>
  )
}

export default AddVideo

const Container = styled.div`
  width: 50%;
  height: 100%;
  position: fixed;
  z-index: 300;
  top: 0;
  right: -50%;
  background-color: #ddd;
  overflow-x: hidden;
  transition: 0.5s;
  border-left: 1px solid grey;
  ::-webkit-scrollbar {
    display: none;
  }
`
const Body = styled.div`
  width: 100%;
  height: 100%;
  padding: 10px;
`
const Header = styled.div`
  width: 50%;
  position: fixed;
  top: 0;
  z-index: 2;
  padding: 20px;
`
const CloseBar = styled.div`
  text-align: left;
`
const CloseIcon = styled(ImCross)`
  color: black;
  cursor: pointer;
`
const Content = styled.div`
  padding-top: 30px;
`
const InputBox = styled.div`
  display: flex;
  align-items: center;
`
const Image = styled.img`
  width: 360px;
  text-align: center;
  margin: 10px 0;
`
const Text = styled.h4`
  flex: 0.2;
  text-align: center;
  margin: 10px 0;
`
const Input = styled.input`
  flex: 0.7;
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
  height: 40px;
  margin-left: 20px;
  border: none;
  transition-duration: 0.4s;
  background-color: #00C851;

  &:hover {
    color: white;
    background-color: #007E33;
  }
`