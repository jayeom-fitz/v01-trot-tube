import React from 'react'
import { Link } from 'react-router-dom'

import styled from "styled-components";

import Avatar from "@material-ui/core/Avatar";

function PersonRow(props) {
  return (
    <Container>
      <StyledLink to={`/person/${props.person.id}`} >
        <StyledAvatar src={props.person.image} />
      </StyledLink>

      <Box>
        <StyledLink to={`/person/${props.person.id}`} >
          <h3>{props.person.name}</h3> 
        </StyledLink>
        <Like>좋아요 : {props.person.likes}</Like>
      </Box>
    </Container> 
  )
}

export default PersonRow

const Container = styled.div`
  width: 80%;
  margin: 20px auto;
  padding: 10px;
  border-bottom: 1px solid grey;
  display: flex;
  align-items: center;
`
const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
`
const StyledAvatar = styled(Avatar)`
  height: 140px !important;
  width: 140px !important;
  margin: 10px 30px;
  border: 1px solid grey;
`
const Box = styled.div`
  padding-left: 50px;
`
const Like = styled.h4`
  font-size: 0.8rem;
  color: grey;
`