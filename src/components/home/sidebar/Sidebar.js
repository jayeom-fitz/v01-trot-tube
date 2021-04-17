import React from 'react'

import styled from 'styled-components';

import SidebarRow from './SidebarRow';

import { ImCross, ImFire } from 'react-icons/im'
import { AiFillHome } from 'react-icons/ai'
import { RiThumbUpFill } from 'react-icons/ri'
import { BiBookHeart } from 'react-icons/bi'

function Sidebar() {  
  return (
    <Container id='sidebar'>
      <CloseBar>
        <CloseIcon onClick={() => {
          document.getElementById("sidebar").style.left = "-300px";
        }}/>
      </CloseBar>

      <SidebarRow 
        link='/'
        iconName={AiFillHome} 
        title="홈"/>

      <SidebarRow 
        link='/hot'
        iconName={ImFire} 
        title="인기"/>

      <SidebarRow 
        link='/like'
        iconName={RiThumbUpFill} 
        title="좋아요"/>

      <SidebarRow 
        link='/guestbook'
        iconName={BiBookHeart} 
        title=">> 방명록 <<"/>
      
      <Line />
          
    </Container>
  )
}

export default Sidebar

const Container = styled.div`
  position: fixed;
  top: 0;
  left: -300px;
  z-index: 200;
  width: 300px;
  height: 100%;
  padding: 20px 20px;
  box-sizing: border-box;
  transition: left 0.3s ease-in-out;
  background-color: black;
`
const CloseBar = styled.div`
  text-align: right;
  margin-bottom: 20px;
`
const CloseIcon = styled(ImCross)`
  color: white;
  cursor: pointer;
`
const Line = styled.hr`
  height: 1px;
  border: 0;
  background-color: white;
  margin-top: 10px;
  margin-bottom: 10px;
`