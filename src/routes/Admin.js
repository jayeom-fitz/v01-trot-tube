import React from 'react'

import { useParams } from "react-router-dom";
import styled from 'styled-components';

import Sidebar from '../components/edition/Sidebar'

import Main from '../components/edition/Main'
import TvProgramsSlider from '../components/edition/TvProgramsSlider';

function Admin(props) {
  const { startComponent } = useParams();

  if(props.user && props.user.verified !== 2) {
    return <>wrong</>;
  }

  const switchComponent = (prop) => {
    switch(prop) {
      case 'tvProgramsSlider' : return <TvProgramsSlider />
      default : return <Main user={props.user} />
    }
  }

  return (
    <div>
      <Sidebar user={props.user} />
      
    </div>
  )
}

export default Admin
