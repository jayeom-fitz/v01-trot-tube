import React, { useState, useEffect } from 'react'

import styled from 'styled-components'

import { storeService } from "src/fbase"

import PeopleEdit from './PeopleEdit';
import PersonCard from './PersonCard';

function People() {
  const [loaded, setLoaded] = useState(false);
  const [edit, setEdit] = useState(false);
  const [pid, setPid] = useState('');
  const [people, setPeople] = useState([]);
  const [value, setValue] = useState(0);

  function valueUp() {
    return setValue(value + 1);
  }

  async function getPeople() {
    let arr = [];
    await storeService.collection('people').get().then(function (snapshot) {  
      snapshot.forEach(doc => 
        arr.push({
          id: doc.id, 
          image: doc.data().image,
          name: doc.data().name
        })       
      );
    })
    setLoaded(true); setPeople(arr);
  }

  useEffect(() => getPeople(), [value])
  
  const onEditButtonClick = (id) => {
    setEdit(false); setPid('');
    if(id !== '') {
      setEdit(true); setPid(id);
    }

    if(document.getElementById("personEdit"))
      document.getElementById("personEdit").style.right = "0";
  };

  return (
    <>
      {loaded ? 
        <div style={{width:'100%'}}>
          <PeopleEdit pid={pid} edit={edit} valueUp={valueUp}/>  

          <Container>
            <Title>인물 관리</Title>

            <div>
              <AddButton onClick={() => onEditButtonClick('')}>추가</AddButton>
              <PeopleCard>
                {people.length === 0 ? <>등록된 인물이 없습니다</> :

                  people.map((person) => 
                  <PersonCard 
                    key={person.id} 
                    personInfo={person}
                    onEditButtonClick={onEditButtonClick}
                  />)
                }
              </PeopleCard>
            </div>
          </Container>
        </div>
      : null}
    </>
  )
}

export default People

const Container = styled.div`
  padding: 40px;
`
const Title = styled.h1`
  margin: 0;
`
const AddButton = styled.button`
  float: right;
  padding: 10px 20px;
  margin-bottom: 10px;
  font-weight: bold;
  border: none;
  background-color: #00C851;

  &:hover {
    background-color: #007E33;
  }
`
const PeopleCard = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  padding: 20px;
`