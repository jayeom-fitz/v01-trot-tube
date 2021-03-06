import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";

import styled from 'styled-components'

import { storeService } from "src/fbase"

import PeopleBox from './PeopleBox';

function TvProgram() {
  const { id } = useParams();

  const [loaded, setLoaded] = useState(true);
  const [tvProgram, setTvProgram] = useState(null);
  const [title, setTitle] = useState('');
  const [value, setValue] = useState(0);

  useEffect(() => {
    async function getTvProgram() {
      await storeService.collection('tv-programs').doc(id).get().then(function (doc) {
        setTvProgram(doc.data());
        setTitle(doc.data().title);
        setLoaded(true);
      })
    }

    getTvProgram();
  }, [id, value])

  const onInfoSave = async () => {
    if(!tvProgram.image || !tvProgram.title || !tvProgram.year || !tvProgram.channel) {
      alert('모든 값을 입력하세요.'); return;
    }
    
    const docRef = storeService.collection('tv-programs').doc(id);
 
    await docRef.get().then(function(doc) {
      docRef.update(tvProgram);
      alert('저장되었습니다.');
      setValue(value + 1);
    }).catch(function(error) {
      alert("Error getting document:", error);
    });
  }

  return (
    <>
      {loaded && tvProgram ? 
        <div style={{width:'100%'}}>
          <Container>
            <Title>TV 프로그램 관리 - {title} [{id}]</Title>
            
            <BoxContainer>
              <Box>
                <Image src={tvProgram.image} alt="" />
              </Box>

              <Box>
                <InputBox>
                  <Text>제목</Text>
                  <Input 
                    value={tvProgram.title} 
                    onChange={(v) => setTvProgram({...tvProgram, title: v.target.value})} />
                </InputBox>

                <InputBox>
                  <Text>이미지</Text>
                  <Input 
                    value={tvProgram.image}
                    onChange={(v) => setTvProgram({...tvProgram, image: v.target.value})} />
                </InputBox>

                <InputBox>
                  <Text>방송사</Text>
                  <Input 
                    value={tvProgram.channel}
                    onChange={(v) => setTvProgram({...tvProgram, channel: v.target.value})} />
                </InputBox>

                <InputBox>
                  <Text>방송년도</Text>
                  <Input 
                    value={tvProgram.year} type="number"
                    onChange={(v) => setTvProgram({...tvProgram, year: v.target.value})} />
                </InputBox>
              </Box>
            </BoxContainer>

            <InputBox>
              <Button onClick={onInfoSave}>저장</Button>
            </InputBox>

            <PeopleBox />            
          </Container>
        </div>
      : null}
    </>
  )
}

export default TvProgram

const Container = styled.div`
  padding: 40px;
`
const Title = styled.h1`
  margin: 0;
`
const BoxContainer = styled.div`
  display: flex;
  align-items: center;
  width: 90%;
  margin: auto;
  padding: 20px;
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