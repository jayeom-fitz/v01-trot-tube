import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";

import styled from 'styled-components';

import { storeService } from 'src/fbase'

function TvProgram({props}) {
  const { tpid } = useParams();

  useEffect(() => {
    
    
  }, [tpid])

  return (
    <Container>
      {tpid}
    </Container>
  )
}

export default TvProgram

const Container = styled.div`
  flex: 1;
  background-color: #f9f9f9;
  padding: 0px 10px;
  padding-bottom: 0;
`
