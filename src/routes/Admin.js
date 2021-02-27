import React from 'react'

import { useParams } from "react-router-dom";

import Sidebar from '../components/admin/sidebar/Sidebar'

import Main from '../components/admin/Main'

import TvProgram from '../components/admin/tv-program/TvProgram';
import TvProgramSlider from '../components/admin/tv-program/TvProgramSlider';
import People from '../components/admin/people/People';

function Admin(props) {
  const { startComponent } = useParams();

  if(props.user == null || props.user.verified !== 2) {
    return <></>;
  }

  const switchComponent = (prop) => {
    switch(prop) {
      case 'tv-program' : return <TvProgram />
      case 'tv-program-slider' : return <TvProgramSlider />
      case 'people' : return <People />
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
