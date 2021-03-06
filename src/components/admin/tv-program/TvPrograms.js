import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import styled from 'styled-components'

import { storeService } from "src/fbase"

import TvProgramAdd from './TvProgramAdd'

function TvProgram() {
  const [loaded, setLoaded] = useState(false);
  const [tvPrograms, setTvPrograms] = useState([]);
  const [value, setValue] = useState(0);

  function valueUp() {
    return setValue(value + 1);
  }

  useEffect(() => {
    async function getTvPrograms() {
      await storeService.collection('tv-programs').get().then(function (snapshot) {
        let arr = [];
        snapshot.forEach(doc =>arr.push({...doc.data(), id: doc.id, active: true}));
        setTvPrograms(arr); 
        setLoaded(true);
      })
    }

    getTvPrograms();
  }, [value])

  const onEditButtonClick = () => {
    if(document.getElementById("tvEdit"))
      document.getElementById("tvEdit").style.display = "flex";
  };

  const onDeleteButtonClick = async (id) => {
    await storeService.collection('tv-programs').doc(id).delete();
    valueUp();
  };

  const onChange = (e) => {
    const name = e.target.value;
    if(tvPrograms.length === 0) return;
    var arr = tvPrograms.slice();
    for(var i=0; i<arr.length; i++) {
      arr[i].active = arr[i].title.includes(name);      
    }
    setTvPrograms(arr);
  }

  return (
    <>
      {loaded ? 
        <div style={{width:'100%'}}>
          <TvProgramAdd valueUp={valueUp}/>

          <Container>
            <Title>TV 프로그램 관리</Title>
            <TvContainer>
              <Input placeholder='이름 검색' onChange={onChange}/>
              <AddButton onClick={onEditButtonClick}>추가</AddButton>
              <TvTable>
                <TableHeader>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>이미지</TableCell>
                    <TableCell>제목</TableCell>
                    <TableCell>방송사</TableCell>
                    <TableCell>방송년도</TableCell>
                    <TableCell>좋아요</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHeader>
                
                <TableBody>
                  {tvPrograms.length !== 0 ?
                  tvPrograms.filter(program => program.active).map((data) => (
                    <TableRow key={data.id}>
                      <TableCell>{data.id}</TableCell>
                      <TableCell>
                        <Image src={data.image} />
                      </TableCell>
                      <TableCell>{data.title}</TableCell>
                      <TableCell>{data.channel}</TableCell>
                      <TableCell>{data.year}</TableCell>
                      <TableCell>{data.likes}</TableCell>
                      <TableCell>
                        <Link to={`/admin/tv-program/${data.id}`}>
                          <EditButton>수정</EditButton>
                        </Link>
                        <DeleteButton onClick={() => onDeleteButtonClick(data.id)}>삭제</DeleteButton>
                      </TableCell>
                    </TableRow>
                  )) : 'no Data'}
                </TableBody>
              </TvTable>
            </TvContainer>
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
const TvContainer = styled.div`

`
const Input = styled.input`
  padding: 10px;
  margin: 20px;
  border: none;
  border-bottom: 1px solid lightgrey;

  &:focus {
    outline: 2px solid #3CAEA3
  }
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
const TvTable = styled.div`
  display: table;
	width: 100%;
`
const TableHeader = styled.div`
  display: table-header-group;
  height: 40px;
  font-weight: bold;
  background-color: lightgrey;
  border: 1px solid black;
`
const TableBody = styled.div`
  display: table-row-group;
`
const TableRow = styled.div`
  display: table-row;
  height: 40px;

  &:hover {
    background-color: lightgrey;
  }
`
const TableCell = styled.div`
  display: table-cell;
  text-align: center;
  vertical-align: middle;
`
const Image = styled.img`
  width: 200px;
`
const EditButton = styled.button`
  padding: 10px 20px;
  font-weight: bold;
  border: none;
  background-color: #ffbb33;

  &:hover {
    background-color: #ff8800;
  }
`
const DeleteButton = styled.button`
  padding: 10px 20px;
  font-weight: bold;
  border: none;
  background-color: #ff4444;

  &:hover {
    background-color: #CC0000;
  }
`
