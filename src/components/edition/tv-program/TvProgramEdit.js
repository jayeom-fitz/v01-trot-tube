import React from 'react'

import styled from 'styled-components';

function TvProgramEdit(props) {
  return (
    <Container id='sideEdit'>
      <Title>TV 프로그램 {props.edit ? '추가' : '수정'}</Title>
      <button onClick={() => {
        document.getElementById("sideEdit").style.display = "none";
      }}>닫기</button>
    </Container>
  )
}

export default TvProgramEdit

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, .7);
  z-index: 1;
`
const Title = styled.h1`

`