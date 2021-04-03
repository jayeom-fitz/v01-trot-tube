import React, { useState } from 'react' 
import { useParams, Link } from "react-router-dom";

import styled from "styled-components";

import { storeService } from "src/fbase";

function Comment(props) {
  return (
    <Container>
      

      
        {props.comment.content}
      
    </Container>
  )
}

export default Comment

const Container = styled.div`
  flex: 1;
  display: flex;
  background-color: #f9f9f9;
  padding: 10px;

  &:hover {
    background-color: #c9c9c9;
  }
`