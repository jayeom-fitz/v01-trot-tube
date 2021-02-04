import React from 'react'
import './VideoRow.css'

import Avatar from "@material-ui/core/Avatar"

function VideoRow({ youtubeId, singer, songTitle }) {
  return (
    <div className="videoRow">
      <img 
        src={`http://img.youtube.com/vi/${youtubeId}/0.jpg`}
        alt=""
      />

      <div className="videoRow__text">
        <Avatar 
          className="videoRow__avatar"
          src={`http://img.youtube.com/vi/${youtubeId}/1.jpg`}
          alt=""
        />
        <h4>{singer} - {songTitle}</h4>
        <p className="videoRow__headline">
          views, timestamp <span className="videoRow__subsNumber">subs</span>
        </p>
        <p className="videoRow__description">
          description
        </p>
        
      </div>
    </div>
  )
}

export default VideoRow