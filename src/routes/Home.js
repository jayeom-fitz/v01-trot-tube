import React from 'react'

import Header from '../components/header/Header'
import RecommendedVideos from '../components/home/RecommendedVideos'
import Sidebar from '../components/sidebar/Sidebar'

function Home(props) {
  return (
    <div>
      <Header user={props.user}/>

      <div style={{display: 'flex'}}>
        <Sidebar />
        <RecommendedVideos />
      </div>
    </div>
  )
}

export default Home
