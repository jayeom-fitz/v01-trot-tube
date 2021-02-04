import React from 'react'
import './RecommendedVideos.css'

import VideoCard from './VideoCard'

function RecommendedVideos() {
  return (
    <div className="recommendedVideos">
      <h2>Recommended</h2>
      <div className="recommendedVideos__videos">
        <VideoCard 
          youtubeId="u-5KQ0Au_5A"
          singer="이찬원"
          songTitle="울긴 왜 울어"
        />
        <VideoCard 
          youtubeId="zlPM0_3MwFQ"
          singer="이찬원"
          songTitle="미운 사내"
        />
        <VideoCard 
          youtubeId="PcfYFnQSEQQ"
          singer="이찬원"
          songTitle="진또배기"
        />
        <VideoCard 
          youtubeId="S9YGinzAcBM"
          singer="이찬원"
          songTitle="18세 순이"
        />
        <VideoCard 
          youtubeId="u-5KQ0Au_5A"
          singer="이찬원"
          songTitle="울긴 왜 울어"
        />
        <VideoCard 
          youtubeId="zlPM0_3MwFQ"
          singer="이찬원"
          songTitle="미운 사내"
        />
        <VideoCard 
          youtubeId="PcfYFnQSEQQ"
          singer="이찬원"
          songTitle="진또배기"
        />
        <VideoCard 
          youtubeId="S9YGinzAcBM"
          singer="이찬원"
          songTitle="18세 순이"
        />
      </div>
    </div>
  )
}

export default RecommendedVideos
