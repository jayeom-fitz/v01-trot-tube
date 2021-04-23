import React, { useState } from 'react'

import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { FiMenu, FiSearch } from 'react-icons/fi' 

import UserIcon from './UserIcon';

function Header(props) {
  const [inputSearch, setInputSearch] = useState('');

  function onSubmit(e) {
    if(inputSearch === '') {
      alert('값을 입력해주세요'); 
      document.getElementById('searchBar').focus(); 
      e.preventDefault();
    } else if(inputSearch.split(' ').length > 2) {
      alert('두 단어 이하로 입력해주세요'); 
      document.getElementById('searchBar').focus(); 
      e.preventDefault();
    }
  }

  function changeStr() {
    const str = inputSearch.split(' ');

    if(str.length === 1) return str[0];
    else return str[0] + '+' + str[1];
  }

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
          id="searchBar"
          value={inputSearch}
          onChange={e => setInputSearch(e.target.value)}
        />

        <form onSubmit={(e) => onSubmit(e)} action={`/search/${changeStr()}`}>
          <Button><FiSearchIcon size="18" /></Button>
        </form>
      </ContainerInput>

      <Icons>        
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
const Button = styled.button`
  display: flex;
  width: 50px;
  height: 30px;
  align-items: center;
  border: none;

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