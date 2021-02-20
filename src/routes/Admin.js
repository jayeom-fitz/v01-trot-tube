import React from 'react'

import { useParams } from "react-router-dom";
import styled from 'styled-components';

import Sidebar from '../components/edition/sidebar/Sidebar'

import Main from '../components/edition/Main'

import TvProgram from '../components/edition/tv-program/TvProgram';
import TvProgramsSlider from '../components/edition/tv-program/TvProgramsSlider';

function Admin(props) {
  const { startComponent } = useParams();

  if(props.user == null || props.user.verified !== 2) {
    return <></>;
  }

  const switchComponent = (prop) => {
    switch(prop) {
      case 'tv-program' : return <TvProgram />
      case 'tv-program-slider' : return <TvProgramsSlider />
      default : return <Main user={props.user} />
    }
  }

  return (
    <div>
      <Sidebar user={props.user}/>
      <div style={{top:'0',marginLeft:'200px'}}>
        {switchComponent(startComponent)}
      </div>
    </div>
  )
}

export default Admin
