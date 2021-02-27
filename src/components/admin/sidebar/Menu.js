import React from 'react'

import styled from 'styled-components'

import { SidebarData } from './SidebarData'
import SubMenu from './SubMenu'

function Menu() {
  return (
    <>
      <SidebarNav >
        <SidebarWrap>
          {SidebarData.map((item, index) => {
            return <SubMenu item={item} key={index} />;
          })}
        </SidebarWrap>
      </SidebarNav>
    </>
  )
}

export default Menu

const SidebarNav = styled.nav`
  background: #15171c;
  width: 200px;
  display: flex;
  justify-content: center;
`;
const SidebarWrap = styled.div`
  width: 100%;
`;

