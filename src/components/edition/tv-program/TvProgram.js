import React, { useState } from 'react'

import styled from 'styled-components'

import TvProgramEdit from './TvProgramEdit'

function TvProgram() {
  const [edit, setEdit] = useState(false);
  const [pid, setPid] = useState('');

  const onAddButtonClick = () => {
    setEdit(false); setPid('');
    document.getElementById("sideEdit").style.display = "flex";
  };

  return (
    <>
      <Container>
        <Title>TV 프로그램 관리</Title>
        <TvContainer>
          <Button onClick={onAddButtonClick}>추가</Button>
          <TvTable>
            <TableHeader>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>이미지</TableCell>
                <TableCell>제목</TableCell>
                <TableCell>좋아요</TableCell>
                <TableCell>방송년도</TableCell>
                <TableCell>수정</TableCell>
              </TableRow>
            </TableHeader>
            
            <TableBody>
              <TableRow>
                <TableCell>aaa</TableCell>
                <TableCell>aaa</TableCell>
                <TableCell>aaa</TableCell>
                <TableCell>aaa</TableCell>
                <TableCell>aaa</TableCell>
                <TableCell>aaa</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>aaa</TableCell>
                <TableCell>aaa</TableCell>
                <TableCell>aaa</TableCell>
                <TableCell>aaa</TableCell>
                <TableCell>aaa</TableCell>
                <TableCell>aaa</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>aaa</TableCell>
                <TableCell>aaa</TableCell>
                <TableCell>aaa</TableCell>
                <TableCell>aaa</TableCell>
                <TableCell>aaa</TableCell>
                <TableCell>aaa</TableCell>
              </TableRow>
            </TableBody>
          </TvTable>
        </TvContainer>
      </Container>

      <TvProgramEdit edit={edit} pid={pid}/>
    </>
  )
}

export default TvProgram

const Container = styled.div`
  padding: 40px;
`
const Title = styled.h1`

`
const TvContainer = styled.div`

`
const Button = styled.button`
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
`
const TableCell = styled.div`
  display: table-cell;
  text-align: center;
  vertical-align: middle;
`
