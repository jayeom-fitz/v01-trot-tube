import React from 'react'

import styled from "styled-components";

import TvPrograms from './TvPrograms'

function HomeContents() {
  return (
    <Container>
      <TvPrograms />
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