import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";

import styled from 'styled-components'

import { storeService } from "src/fbase"

import { AiOutlineArrowUp, AiOutlineArrowDown } from 'react-icons/ai'
import { BsPlusCircle } from 'react-icons/bs'
import Avatar from '@material-ui/core/Avatar'

import AddPeople from './AddPeople'

function PeopleBox() {
  const { id } = useParams();

  const [loaded, setLoaded] = useState(false);
  const [directories, setDirectories] = useState([]);
  const [deleted, setDeleted] = useState([]);
  const [people, setPeople] = useState([]);

  const [did, setDid] = useState('');
  const [dtitle, setDtitle] = useState('');

  useEffect(() => {
    async function getDirectories() {
      var dir = []; var pp = [];
      const dirRef = storeService.collection('tv-programs').doc(id);

      await dirRef.collection('directories').get().then(function (snapshot) {
        snapshot.forEach(doc => dir.push({
          ...doc.data(), id: doc.id, onDB: true, updated: false
        }));
      });

      await dirRef.collection('people').get().then(function (snapshot) {
        snapshot.forEach(async function (doc) {
          await storeService.collection('people').doc(doc.id).get().then(function (person) {
            pp.push({
              id: doc.id,
              dir: doc.data().dir, 
              name: person.data().name,
              image: person.data().image,
              onDB: true, updated: false
            })      
          }) 
        });
      });

      setDirectories(dir.sort(function (a,b) {
        return a.index - b.index;
      })); setPeople(pp); setLoaded(true);
    }

    getDirectories();
  }, [])

  const onAddDirectoryClick = () => {
    setDirectories([...directories, {
      id: `directory${directories.length}`,
      index: directories.length,
      title: '새 디렉토리',
      textColor: 'ffffff',
      bgColor: '000000',
      onDB: false,
      updated: true,
    }]);
  }

  const onApplyClick = (id) => {
    let arr = directories.slice();
    var i;
    for(i=0; i<arr.length; i++) {
      if(id === arr[i].id){
        if(!arr[i].onDB && document.getElementById(id).value !== '') {
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
    arr[i].updated = true;
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

  const onMoveClick = ({idx, dir}) => {
    if(idx + dir < 0 || idx + dir >= directories.length) 
      return;

    var arr = directories.slice();

    var a = arr[idx]; 
    a.index = idx + dir; 
    a.updated = true;

    arr[idx] = arr[idx + dir]; 
    arr[idx].index = idx; 
    arr[idx].updated = true;

    arr[idx + dir] = a;
    setDirectories(arr);
  }

  const onAddPeopleButtonClick = (idx) => {
    setDid(directories[idx].id);    setDtitle(directories[idx].title);
    document.getElementById("AddPeople").style.right = "0";
  }
  
  const onAddPeople = (array) => {
    var arr = people.slice();
    array.map(data => arr.push({
      id: data.id, 
      image: data.image, 
      name: data.name,
      dir: did,
      onDB: false,
      updated: true
    }));
    setPeople(arr);
  }

  const onSave = async () => {
    var i;
    if(deleted.length !== 0) {

    }

    const dirRef = storeService.collection('tv-programs').doc(id);
    for(i=0; i<directories.length; i++) {
      if(!directories[i].onDB || directories[i].updated) {
        await dirRef.collection('directories').doc(directories[i].id).set({
          index: directories[i].index,
          title: directories[i].title,
          textColor: directories[i].textColor,
          bgColor: directories[i].bgColor,
        })
      } 
    }

    const ppRef = storeService.collection('people');
    var arr = people.slice();
    for(i=0; i<arr.length; i++) {
      if(!arr[i].onDB) {
        await ppRef.doc(arr[i].id).collection('tv-programs').doc(id).set({
          addedDate: Date.now()
        })
        arr[i].onDB = true;
      }
      if(arr[i].updated) {
        await dirRef.collection('people').doc(arr[i].id).set({
          dir: arr[i].dir
        })
        arr[i].updated = false;
      }
    }
    setPeople(arr);
    alert('저장되었습니다.');
  }

  return (
    <Container>
      {!loaded ? null : <>
        <AddPeople 
          id={did}
          title={dtitle}
          addedPeople={people}
          onAddPeople={onAddPeople}
        />

        {directories.length === 0 ? null : 
          directories.map((data) => 
            <Directory key={data.id}>
              <Setting>
                <DirectorySetting>
                  <div>
                    {data.onDB ? null :
                      <Input id={data.id} width='100px' placeholder='id...'/>
                    }
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
                    color='#d9534f' hoverColor='' hoverBColor='#ae423f'
                    onClick={() => onDeleteClick(data.index)}>삭제</Button>
                  <Button 
                    color='#FFC0CB' hoverColor='' hoverBColor='#FF69B4'
                    onClick={() => onMoveClick({idx: data.index, dir: -1})}
                    ><AiOutlineArrowUp /></Button>
                  <Button 
                    color='#87CEEB' hoverColor='' hoverBColor='#00CCCC'
                    onClick={() => onMoveClick({idx: data.index, dir: 1})}
                    ><AiOutlineArrowDown /></Button>
                </ButtonBox> 
              </Setting>

              <DirectoryContent>
                <TopLine>
                  <DirectoryContentTitle tcolor={data.textColor} bcolor={data.bgColor}>
                    {data.title}
                  </DirectoryContentTitle>
                </TopLine>
                
                <People bcolor={data.bgColor}>
                  {
                    people.filter(person => person.dir === data.id).map(p => 
                      <PersonCard key={`person-${p.id}`}>
                        <StyledAvatar src={p.image} />
                        <Name>{p.name}</Name>
                      </PersonCard>
                    )
                  }
                  <AddPeopleButton onClick={() => onAddPeopleButtonClick(data.index)}>
                    <BsPlusCircle style={{margin:'auto'}} size="24" color="grey"/>
                  </AddPeopleButton>
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
      </>}
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
  display: flex;
  flex-wrap: wrap;
  border: 1px solid #${(props) => props.bcolor || '000000'};
`
const AddPeopleButton = styled.div`
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
const PersonCard = styled.div`
  width: 150px;
  padding-top: 10px;

  &:hover {
    background-color: lightgrey;
  }
`
const StyledAvatar = styled(Avatar)`
  width: 120px !important;
  height: 120px !important;
  margin: auto;
  border: 1px solid lightgrey;
`
const Name = styled.h4`
  text-align: center;
`
