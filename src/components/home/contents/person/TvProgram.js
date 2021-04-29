import React from 'react'
import { Link } from "react-router-dom";

import styled from "styled-components";

function TvProgram(props) {
  return (
    <Container>
      <Link to={`/tv/${props.tvProgram.id}`} >
        <Image src={props.tvProgram.image} />
      </Link>
    </Container>
  )
}

export default TvProgram

const Container = styled.div`
  display: flex;
  width: 200px;
  padding: 10px;
`
const Image = styled.img`
  max-width: 200px;
`
