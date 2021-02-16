import React from 'react'

import Header from '../components/header/Header'
import Sidebar from '../components/sidebar/Sidebar'

import HomeContents from '../components/contents/home/HomeContents'
import UserInfo from '../components/contents/info/user/UserInfo'

function Home(props) {
  const switchPage = (prop) => {
    switch(prop) {
      case 'user' : return <UserInfo user={props.user} />
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
