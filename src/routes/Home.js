import React from 'react'
import '../App.css'

import Header from '../components/header/Header';
import Sidebar from '../components/sidebar/Sidebar';
import RecommendedVideos from '../components/videos/RecommendedVideos';

function Home() {
  return (
    <div>
      <Header />
      <div className="app__page">
        <Sidebar />
        <RecommendedVideos />
      </div>
    </div>
  )
}

export default Home
