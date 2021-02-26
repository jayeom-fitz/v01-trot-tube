import React from 'react'

import Header from '../components/home/header/Header'
import Sidebar from '../components/home/sidebar/Sidebar'

import HomeContents from '../components/home/contents/HomeContents'
import UserInfo from '../components/home/contents/user/UserInfo'

import TvProgram from '../components/home/contents/tv-program/TvProgram'


function Home(props) {
  const switchPage = (prop) => {
    switch(prop) {
      case 'user' : return <UserInfo user={props.user} />
      case 'tv-program' : return <TvProgram user={props.user} />
      default : return <HomeContents user={props.user} />
    }
  }

  return (
    <div>
      <Header user={props.user} />

      <div style={{display: 'flex'}}>
        <Sidebar />
        {switchPage(props.pageName)}
      </div>
    </div>
  )
}

export default Home
