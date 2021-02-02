import React from 'react'
import './SearchVideos.css'

import TuneOutlinedIcon from '@material-ui/icons/TuneOutlined'

function SearchVideos() {
  return (
    <div className="searchVideos">
      <div className="searchVideos__filter">
        <TuneOutlinedIcon />
        <h2>FILTER</h2>
      </div>
      
      <hr />

    </div>
  )
}

export default SearchVideos
