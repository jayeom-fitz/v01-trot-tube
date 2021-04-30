import React, { useState, useEffect } from 'react'
import { useParams, Link } from "react-router-dom";

import styled from 'styled-components'

import { storeService } from "src/fbase"

import Avatar from "@material-ui/core/Avatar";

function Person() {
  const { id } = useParams();
  
  const [loaded, setLoaded] = useState(false);
  const [person, setPerson] = useState(null);
  const [name, setName] = useState('');

  async function getData() {
    const pref = storeService.collection('people').doc(id);
  
    await pref.get().then(function (doc) {
      setPerson({
        id,
        ...doc.data()
      });
      setName(doc.data().name);
    })

    setLoaded(true);
  }

  useEffect(() => {
    getData()
  }, [])

  const setData = () => {   
    setPerson({
      id,
      name: document.getElementById('name').value,
      birth: document.getElementById('birth').value,
      image: document.getElementById('image').value,
      company: document.getElementById('company').value,
    });
  }

  async function onSave() {
    const pref = storeService.collection('people').doc(id);

    pref.update({...person});

    alert('저장되었습니다.')
  }

  return (
    <Container>
      {loaded && person && <>
        <Title>[ {name} ] 의 정보</Title>
        
        <Content>
          <Link to={`/person/${id}`}>
            <StyledAvatar src={person.image} />
          </Link>

          <div style={{paddingLeft:'50px'}}>
            <InputBox>
              <Text>아이디</Text>
              <Input value={id} readOnly/>
            </InputBox>
            
            <InputBox>
              <Text>이름</Text>
              <Input id='name' value={person.name} onChange={setData}/>
            </InputBox>

            <InputBox>
              <Text>생년월일</Text>
              <Input id='birth' value={person.birth} onChange={setData}/>
            </InputBox>

            <InputBox>
              <Text>이미지</Text>
              <Input id='image' value={person.image} onChange={setData}/>
            </InputBox>

            <InputBox>
              <Text>소속사</Text>
              <Input id='company' value={person.company} onChange={setData}/>
            </InputBox> 
          </div>
        </Content>

        <div style={{textAlign:'center'}}>
          <Button onClick={() => onSave()}> 저장 </Button>
        </div>
      </>}
    </Container>
  )
}

export default Person

const Container = styled.div`
  width: 80%;
  padding: 40px;
`
const Title = styled.h1`
  margin: 0;
`
const Content = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  width: 90%;
`
const StyledAvatar = styled(Avatar)`
  height: 140px !important;
  width: 140px !important;
  margin: 10px 30px;
  border: 1px solid grey;
`
const InputBox = styled.div`
  display: flex;
  width: 400px;
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
  padding: 10px 20px;
  font-weight: bold;
  border: none;
  background-color: #00C851;

  &:hover {
    background-color: #007E33;
  }
`