import React, { useState } from 'react'

import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { FiMenu, FiSearch } from 'react-icons/fi' 
import { IoNotifications } from 'react-icons/io5'

import UserIcon from './UserIcon';


function Header(props) {
  const [inputSearch, setInputSearch] = useState('');

  return (
    <Container>
      <ContainerLeft>
        <FiMenuIcon 
          onClick={() => {
            document.getElementById("sidebar").style.left = "0px";
          }} 
          size='24' />
        <Link to="/">
          <Logo src="/images/logo-trottube.png" />
        </Link>
      </ContainerLeft>

      <ContainerInput>
        <Input 
          type="text" 
          placeholder="Search" 
          value={inputSearch}
          onChange={e => setInputSearch(e.target.value)}
        />

        <InputLink to={inputSearch && `/search/${inputSearch}`} >
          <FiSearchIcon size="18" />
        </InputLink>
      </ContainerInput>

      <Icons>
        {props.user ? (
          <>
            <NotificationIcon size="24"/>
          </>
        ) : null}
        
        <UserIcon user={props.user}/>
      </Icons>
    </Container>
  )
}

export default Header

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px 0 20px;
  position: sticky;
  top: 0;
  z-index: 100;
  background-color: white;
`
const ContainerLeft = styled.div`
  display: flex;
  align-items: center;
`
const Logo = styled.img`
  height: 40px;
  object-fit: contain;
  padding: 20px;
`
const FiMenuIcon = styled(FiMenu)`
  cursor: pointer;

  &:hover {
    color: red;
  }
`
const FiSearchIcon = styled(FiSearch)`
  width: 100% !important;
  height: 24px;
  color: gray;
`
const ContainerInput = styled.div`
  display: flex;
  align-items: center;
  width: 40%;
  border: 1px solid lightgray;
`
const Input = styled.input`
  flex: 1;
  border: none;
  height: 28px;

  &:focus {
    outline: 2px solid lightskyblue;
  }  
`
const InputLink = styled(Link)`
  display: flex;
  width: 50px !important;
  height: 30px;
  border-left: 1px solid lightgray;
  align-items: center;

  &:focus {
    outline: none;
    background-color: darkgray;
  }

  &:hover {
    background-color: darkgray;
  }
`
const Icons = styled.div`
  display: flex;
  align-items: center;
`
const NotificationIcon = styled(IoNotifications)`
  margin-right: 10px;
`