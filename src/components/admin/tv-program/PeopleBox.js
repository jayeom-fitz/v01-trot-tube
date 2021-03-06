import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";

import styled from 'styled-components'

import { storeService } from "src/fbase"

import { BsPlusCircle } from 'react-icons/bs'

function PeopleBox() {
  const { id } = useParams();

  const [directories, setDirectories] = useState([]);
  const [deleted, setDeleted] = useState([]);
  const [people, setPeople] = useState([]);

  useEffect(() => {
    
  }, [])

  const onAddDirectoryClick = () => {
    setDirectories([...directories, {
      id: `new${directories.length}`,
      index: directories.length,
      title: '새 디렉토리',
      textColor: 'ffffff',
      bgColor: '000000',
      onDB: false,
    }]);
  }

  const onApplyClick = (id) => {
    let arr = directories.slice();
    for(var i=0; i<arr.length; i++) {
      if(id === arr[i].id){
        if(document.getElementById(id).value !== '') {
          for(var j=0; j<arr.length; j++) {
            if(i !== j && document.getElementById(id).value === arr[j].id) {
              alert('중복된 id 입니다.')
              document.getElementById(id).focus();
              return;
            }
          }
          arr[i].id = document.getElementById(id).value;
        }

        if(document.getElementById(`${id}-title`).value !== '') 
          arr[i].title = document.getElementById(`${id}-title`).value;
        if(document.getElementById(`${id}-tcolor`).value !== '') 
          arr[i].textColor = document.getElementById(`${id}-tcolor`).value;
        if(document.getElementById(`${id}-bgcolor`).value !== '') 
          arr[i].bgColor = document.getElementById(`${id}-bgcolor`).value;
        break;
      }
    }
    setDirectories(arr);
  }

  const onDeleteClick = (idx) => {
    if(directories[idx].onDB) 
      setDeleted([...deleted, directories[idx]]);

    if(directories.length === 1) {
      setDirectories([]);      
    } else {
      let arr = [];

      if(idx === 0) 
        arr = directories.slice(1);
      else if(idx === directories.length-1) 
        arr = directories.slice(0,idx);
      else
        arr = [...directories.slice(0,idx), ...directories.slice(idx+1)];

      for(var i=0; i<arr.length; i++)
        arr[i].index = i;
      setDirectories(arr);
    }
  }

  const onChange = (e) => {
    console.log(e.target);
  }

  const onSave = () => {

  }

  return (
    <Container>
      {directories.length === 0 ? null : 
        directories.map((data) => 
          <Directory key={data.id}>
            <Setting>
              <DirectorySetting>
                <div>
                  <Input id={data.id} width='100px' placeholder='id...'/>
                  {data.id} 
                </div>
                <div>
                  <Input id={`${data.id}-title`} width='150px' placeholder='title...' />
                  {data.title} 
                </div>
                <div>
                  <Input id={`${data.id}-bgcolor`} width='100px' placeholder='bg-color...' />
                  {data.bgColor}
                </div>
                <div>
                  <Input id={`${data.id}-tcolor`} width='100px' placeholder='text-color...' />
                  {data.textColor}
                </div>                
              </DirectorySetting>

              <ButtonBox>
                <Button 
                  color='#0275d8' hoverColor='' hoverBColor='#003399'
                  onClick={() => onApplyClick(data.id)}>적용</Button>
                <Button 
                  color='#d9534f' hoverColor='white' hoverBColor='#ae423f'
                  onClick={() => onDeleteClick(data.index)}>삭제</Button>
              </ButtonBox> 
            </Setting>

            <DirectoryContent>
              <TopLine>
                <DirectoryContentTitle tcolor={data.textColor} bcolor={data.bgColor}>
                  {data.title}
                </DirectoryContentTitle>
              </TopLine>

              <People>
                {people.filter(person => person.dir === data.id).length === 0 ? null : 
                  <>aaaa</>
                }
                <AddPeople>
                  <BsPlusCircle style={{margin:'auto'}} size="24" color="grey"/>
                </AddPeople>
              </People>
            </DirectoryContent>
            
          </Directory>
        )
      }

      <AddBox onClick={onAddDirectoryClick}>
        <BsPlusCircle style={{margin:'auto'}} size="24" color="grey"/>
      </AddBox>       

      <InputBox>
        <Button onClick={onSave}>저장</Button>
      </InputBox> 
    </Container>
  )
}

export default PeopleBox

const Container = styled.div`
  width: 90%;
  margin: auto;
  padding: 20px;
`
const Directory = styled.div`
  width: 100%;
  margin: 10px;
`
const Setting = styled.div`
  display: flex;
  padding: 10px;
  justify-content: center;
`
const DirectorySetting = styled.div`
  flex: 0.6;
  padding: 10px;
`
const ButtonBox = styled.div`
  flex: 0.4;
  align-items: center;
  vertical-align: middle;
`
const DirectoryContent = styled.div`
  padding: 10px;
`
const People = styled.div`
  width: 100%;
  border: 1px solid #${(props) => props.bcolor || '000000'};
`
const AddPeople = styled.div`
  display: flex;
  width: 150px;
  height: 200px;
  margin: 10px;
  border: 1px solid lightgrey;
  border-radius: 20px;
  align-items: center;
  background-color: #ddd;

  &:hover {
    background-color: #aaa;
  }
`
const TopLine = styled.div`
  display: flex;
  align-items: center;
`
const Input = styled.input`
  width: ${(props) => props.width || '50px'};
  margin-right: 10px;
  padding: 5px;
`
const DirectoryContentTitle = styled.div`
  width: 150px;
  height: 20px;
  padding: 5px;
  text-align: center;
  color: #${(props) => props.tcolor || 'ffffff'};
  background-color: #${(props) => props.bcolor || '000000'};
`
const AddBox = styled.div`
  display: flex;
  width: 100%;
  height: 100px;
  margin-top: 20px;
  border: 1px solid lightgrey;
  border-radius: 20px;
  align-items: center;
  background-color: #ddd;

  &:hover {
    background-color: #aaa;
  }
`
const InputBox = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
`
const Button = styled.button`
  width: 75px;
  height: 50px;
  margin: auto;
  border: none;
  transition-duration: 0.4s;
  background-color: ${(props) => props.color || '#00C851'};

  &:hover {
    color: ${(props) => props.hoverColor || 'white'};
    background-color: ${(props) => props.hoverBColor || '#007E33'};
  }
`
