import React from 'react'

import styled from "styled-components";

import TvProgramSlider from './tv-program/TvProgramSlider';

function HomeContents(props) {
  return (
    <Container>
      <TvProgramSlider user={props.user}/>
    </Container>
  )
}

export default HomeContents

const Container = styled.div`
  flex: 1;
  background-color: #f9f9f9;
  padding: 0px 10px;
  padding-bottom: 0;
`