import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import styled from 'styled-components'

import { storeService } from "src/fbase"

import PeopleAdd from './PeopleAdd';
import PersonCard from './PersonCard';

function People() {
  const [loaded, setLoaded] = useState(false);
  const [people, setPeople] = useState([]);
  const [value, setValue] = useState(0);

  function valueUp() {
    return setValue(value + 1);
  }

  async function getPeople() {
    let arr = [];
    await storeService.collection('people').orderBy('name', 'asc').get().then(function (snapshot) {  
      snapshot.forEach(doc => 
        arr.push({
          id: doc.id, 
          image: doc.data().image,
          name: doc.data().name,
          active: true
        })       
      );
    })
    setLoaded(true); setPeople(arr);
  }

  useEffect(() => getPeople(), [value])
  
  const onEditButtonClick = () => {
    if(document.getElementById("personEdit"))
      document.getElementById("personEdit").style.right = "0";
  };

  const onChange = (e) => {
    const name = e.target.value;
    if(people.length === 0) return;
    var arr = people.slice();
    for(var i=0; i<arr.length; i++) {
      arr[i].active = arr[i].name.includes(name);      
    }
    setPeople(arr);
  }

  return (
    <>
      {loaded ? 
        <div style={{width:'100%'}}>
          <PeopleAdd valueUp={valueUp}/>  

          <Container>
            <Title>인물 관리</Title>
            
            <div>
              <Input placeholder='이름 검색' onChange={onChange}/>
              <AddButton onClick={() => onEditButtonClick('')}>추가</AddButton>
              <PeopleCard>
                {people.length === 0 ? <>등록된 인물이 없습니다</> :
                  people.filter(person => person.active).map((person) => 
                  <StyledLink to={`/admin/person/${person.id}`} key={person.id}>
                    <PersonCard personInfo={person} />
                  </StyledLink>
                )}
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
const Input = styled.input`
  padding: 10px;
  margin-top: 20px;
  border: none;
  border-bottom: 1px solid lightgrey;

  &:focus {
    outline: 2px solid #3CAEA3
  }
`
const AddButton = styled.button`
  float: right;
  padding: 10px 20px;
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
const StyledLink = styled(Link)`
  color: black;
  text-decoration: none;  
`