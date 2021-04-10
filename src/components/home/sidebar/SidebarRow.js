import React from 'react'

import { Link } from 'react-router-dom';
import styled from 'styled-components';

const MaterialIcon = (props) => (
  <props.iconName color='white' />
);

const Icon = styled(MaterialIcon)`
  font-size: large !important;
`

function SidebarRow({ iconName, title, link }) {  
  return (
    <Link to={`${link}`} style={{textDecoration:'none'}}>
      <Container>
        <Icon iconName={iconName} />
        <Content>{title}</Content>
      </Container>
    </Link>
  )
}

export default SidebarRow

const Content = styled.h2`
  flex: 1;
  margin-left: 20px;
  font-size: 14px;
  font-weight: 500;
  color: white;
`
const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 0px 20px;
  
  &:hover {
    background-color: lightgray;
    cursor: pointer;

    * {
      color: red;
    }

    ${Content} {
      color: black;
      font-weight: bold;
    }
  }
`