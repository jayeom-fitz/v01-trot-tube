import React from 'react'

import Header from '../components/header/Header'
import Sidebar from '../components/sidebar/Sidebar'

import RecommendedVideos from '../components/contents/home/RecommendedVideos'
import UserInfo from '../components/contents/info/UserInfo'

function Home(props) {
  const switchPage = (prop) => {
    switch(prop) {
      case 'user' : return <UserInfo />
      default : return <RecommendedVideos />
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
