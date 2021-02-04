import React from "react";
import "./SearchVideos.css";

import TuneOutlinedIcon from "@material-ui/icons/TuneOutlined";

import PersonRow from "../people/PersonRow";
import VideoRow from "./VideoRow";

function SearchVideos() {
  return (
    <div className="searchVideos">
      <div className="searchVideos__filter">
        <TuneOutlinedIcon />
        <h2>FILTER</h2>
      </div>
      <hr />

      <PersonRow personName="이찬원" />
      <hr />

      <VideoRow
        youtubeId="u-5KQ0Au_5A"
        singer="이찬원"
        songTitle="울긴 왜 울어"
      />
      <VideoRow 
        youtubeId="zlPM0_3MwFQ" 
        singer="이찬원" 
        songTitle="미운 사내" 
      />
      <VideoRow 
        youtubeId="PcfYFnQSEQQ" 
        singer="이찬원" 
        songTitle="진또배기" 
      />
      <VideoRow 
        youtubeId="S9YGinzAcBM" 
        singer="이찬원" 
        songTitle="18세 순이" 
      />
    </div>
  );
}

export default SearchVideos;
