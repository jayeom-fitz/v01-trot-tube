import React from 'react'
import './VideoCard.css'

import Avatar from "@material-ui/core/Avatar"

function VideoCard({ youtubeId, singer, songTitle }) {
  return (
    <div className="videoCard">
      <img 
        className="videoCard__thumbnail"
        src={`http://img.youtube.com/vi/${youtubeId}/0.jpg`}
        alt=""
      />
      <div className="videoCard__info">
        <Avatar 
          className="videoCard__avatar"
          src={`http://img.youtube.com/vi/${youtubeId}/1.jpg`}
          alt=""
        />
        <div className="videoCard__text">
          <h4>{singer}</h4>
          <h4>{songTitle}</h4>
          <p>views, timestamp</p>
        </div>
      </div>
    </div>
  )
}

export default VideoCard
