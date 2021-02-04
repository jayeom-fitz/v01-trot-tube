import React from 'react'
import './SearchVideos.css'

import TuneOutlinedIcon from '@material-ui/icons/TuneOutlined'

import PersonRow from '../people/PersonRow'

function SearchVideos() {
  return (
    <div className="searchVideos">      
      <div className="searchVideos__filter">
        <TuneOutlinedIcon />
        <h2>FILTER</h2>
      </div>
      <hr />

      <PersonRow 
        personName="이찬원"
      />
      <hr />

      

    </div>
  )
}

export default SearchVideos
