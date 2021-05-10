import React from 'react'

import styled, { keyframes } from 'styled-components';

import { VscLoading } from 'react-icons/vsc'

function Loading() {
  return (
    <Container>
      <StyledVscLoading size='48' />
    </Container>
  )
}

export default Loading

const Container = styled.div`
  width: 100%;
  padding: 20px;
  text-align: center;
`
const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`
const StyledVscLoading = styled(VscLoading)`
  animation: ${rotate360} 2s linear infinite;
`
