import React from 'react'

import styled from 'styled-components'

import Avatar from '@material-ui/core/Avatar'

function PersonCard(props) {
  return (
    <Container>
      <StyledAvatar src={props.personInfo.image} />
      <Name>{props.personInfo.name}</Name>
    </Container>
  )
}

export default PersonCard

const Container = styled.div`
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