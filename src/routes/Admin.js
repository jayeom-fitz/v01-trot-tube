import React from 'react'

import { useParams } from "react-router-dom";
import styled from 'styled-components';

import Sidebar from '../components/edition/sidebar/Sidebar'

import Main from '../components/edition/Main'
import TvProgramsSlider from '../components/edition/TvProgramsSlider';

function Admin(props) {
  const { startComponent } = useParams();

  if(props.user == null || props.user.verified !== 2) {
    return <></>;
  }

  const switchComponent = (prop) => {
    switch(prop) {
      case 'tvProgramsSlider' : return <TvProgramsSlider />
      default : return <Main user={props.user} />
    }
  }

  return (
    <div style={{display:'flex',flexDirection:'row'}}>
      <Sidebar user={props.user} />
      <Main user={props.user} />
    </div>
  )
}

export default Admin
