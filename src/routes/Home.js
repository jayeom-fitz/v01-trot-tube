import React from 'react'

import Header from '../components/header/Header'
import RecommendedVideos from '../components/home/RecommendedVideos'
import Sidebar from '../components/sidebar/Sidebar'

function Home() {
  return (
    <div>
      <Header />

      <div style={{display: 'flex'}}>
        <Sidebar />
        <RecommendedVideos />
      </div>
    </div>
  )
}

export default Home
