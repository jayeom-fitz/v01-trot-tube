import React from 'react'

import styled from 'styled-components'
import { Link } from 'react-router-dom'

import ManagerBox from './ManagerBox'
import Menu from './Menu'

function Sidebar(props) {  
  return (
    <Container>
      <Link to="/" >
        <Logo src="/images/logo-trottube.png" />
      </Link>

      <ManagerBox user={props.user} />
      <Menu />
    </Container>
  )
}

export default Sidebar

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 200px;
  height: 100%;
  z-index: 1;
  background-color: #413630;
  text-align: center;
`
const Logo = styled.img`
  height: 40px;
  margin-top: 20px;
`
