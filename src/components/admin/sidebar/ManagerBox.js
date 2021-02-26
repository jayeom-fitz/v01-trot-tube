import React from 'react'

import styled from 'styled-components';

import Avatar from '@material-ui/core/Avatar'

function ManagerBox(props) {  
  return (
    <Container>
      <StyledAvatar src={props.user.photoURL} />
      <Nickname>{props.user.nickname}</Nickname>
    </Container>
  )
}

export default ManagerBox

const Container = styled.div`
  width: 90%;
  margin: auto;
  padding: 10px 0;
`
const StyledAvatar = styled(Avatar)`
  width: 100px !important;
  height: 100px !important;
  margin: auto;
`
const Nickname = styled.h4`
  color: #FEE100;
  font-family: NotoSans-medium, sans-serif;
  font-weight: bolder;
`