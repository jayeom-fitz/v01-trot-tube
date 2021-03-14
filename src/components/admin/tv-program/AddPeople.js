import React from 'react'

import styled, { css } from 'styled-components'

import { ImCross } from 'react-icons/im'
import Avatar from '@material-ui/core/Avatar'

function AddPeople(props) {
  const onChange = (e) => {
    const name = e.target.value;
    if(props.people.length === 0) return;
    var arr = props.people.slice();
    for(var i=0; i<arr.length; i++) {
      arr[i].active = arr[i].name.includes(name);      
    }
    props.setPeople(arr);
  }

  const onPersonClick = (id) => {
    var arr = props.people.slice();
    for(var i=0; i<arr.length; i++) {
      if(arr[i].id === id) {
        arr[i].selected = !arr[i].selected;    
        break;
      }
    }
    props.setPeople(arr);
  }

  const onAddButtonClick = () => {
    props.onAddPeople(props.people.filter(person => person.selected));
    props.setPeople(props.people.filter(person => !person.selected));
    document.getElementById("AddPeople").style.right = "-100%";
  }

  return (
    <Body id='AddPeople'>
        <Container>
          <Header>
            <CloseBar>
              <CloseIcon onClick={() => {
                document.getElementById("AddPeople").style.right = "-100%";
              }}/>
            </CloseBar>

            <div style={{textAlign:'center'}}>
              <Title>[{props.title}] 인물 추가</Title>
              <div>
                <Input placeholder='이름 검색' onChange={onChange}/>
                <Button onClick={onAddButtonClick}>추가</Button>
              </div>
            </div>
          </Header>
          
          <PeopleCard>
            {props.people.length === 0 ? <>등록된 인물이 없습니다</> :
              props.people.filter(person => person.active).map((person) =>   
                <PersonCard 
                  key={`addPerson-${person.id}`} 
                  onClick={() => onPersonClick(person.id)}
                  selected={person.selected}
                >
                  <StyledAvatar src={person.image} />
                  <Name>{person.name}</Name>
                </PersonCard>
            )}
          </PeopleCard>
        </Container>
    </Body>
  )
}

export default AddPeople

const Body = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 2;
  top: 0;
  right: -100%;
  background-color: #ddd;
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
const Header = styled.div`
  width: 100%;
  position: fixed;
  top: 0;
  background-color: #ddd;
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
const Title = styled.h2`
  text-align: center;
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
const Button = styled.button`
  width: 75px;
  height: 50px;
  margin-left: 50px;
  border: none;
  transition-duration: 0.4s;
  background-color: #00C851;

  &:hover {
    color: white;
    background-color: #007E33;
  }
`
const PeopleCard = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  padding: 20px;
  margin-top: 200px;
`
const PersonCard = styled.div`
  width: 120px;
  padding-top: 10px;

  ${(props) => {
    if(props.selected) {
      return css`
        background-color: #888;
      `;
    } else {
      return css`
        &:hover {
          background-color: lightgrey;
        }
      `;
    }
  }}
`
const StyledAvatar = styled(Avatar)`
  width: 100px !important;
  height: 100px !important;
  margin: auto;
  border: 1px solid lightgrey;
`
const Name = styled.h4`
  text-align: center;
`