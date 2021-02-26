import React from 'react'

import styled from 'styled-components';

import SidebarRow from './SidebarRow';

import { ImCross, ImFire } from 'react-icons/im'
import { AiFillHome } from 'react-icons/ai'
import { MdSubscriptions, MdVideoLibrary, MdWatchLater } from 'react-icons/md'
import { RiVideoFill, RiThumbUpFill } from 'react-icons/ri'

function Sidebar() {  
  return (
    <Container id='sidebar'>
      <CloseBar>
        <CloseIcon onClick={() => {
          document.getElementById("sidebar").style.left = "-300px";
        }}/>
      </CloseBar>

      <SidebarRow 
        link=''
        iconName={AiFillHome} 
        title="홈"/>
      <SidebarRow iconName={ImFire} title="인기"/>
      <SidebarRow iconName={MdSubscriptions} title="구독"/>

      <Line />

      <SidebarRow iconName={RiVideoFill} title="보관함"/>
      <SidebarRow iconName={MdVideoLibrary} title="내 재생 목록"/>
      <SidebarRow iconName={MdWatchLater} title="나중에"/>
      <SidebarRow iconName={RiThumbUpFill} title="좋아요"/>
          
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