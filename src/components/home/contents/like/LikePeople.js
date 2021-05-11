import React from 'react'
import { Link } from 'react-router-dom'

import styled from "styled-components";

import Avatar from "@material-ui/core/Avatar";

import { dateToString } from "src/func"

function LikePeople(props) {
  return (
    <>
      <Link to={`/person/${props.person.id}`} style={{textDecoration:'none'}}>
        <PersonBox>
          <StyledAvatar src={props.person.image} />
          <Name>{props.person.name}</Name>
          <WriteTime>누른 시간 : {dateToString(props.person.liked)}</WriteTime>
        </PersonBox>
      </Link>
    </>
  )
}

export default LikePeople

const PersonBox = styled.div`
  width: 150px;
  padding-top: 10px;

  &:hover {
    background-color: lightgrey;
  }
`
const StyledAvatar = styled(Avatar)`
  width: 100px !important;
  height: 100px !important;
  margin: auto;
  border: 1px solid lightgrey;
`
const Name = styled.h4`
  text-align: center;
`
const WriteTime = styled.h4`
  color: grey;
  font-size: 0.6rem;
  margin: 5px;
  text-align: center;
`