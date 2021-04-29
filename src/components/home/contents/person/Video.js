import React from 'react'
import { Link } from "react-router-dom";

import styled from "styled-components";

import { dateToString2 } from "src/func"

function Video(props) {
  return (
    <>
      <Link to={`/video/${props.video.id}`} style={{textDecoration:'none'}}>
        <VideoBox>
          <Image src={`http://img.youtube.com/vi/${props.video.id}/0.jpg`} />
          <Song>{props.video.song}</Song>
          <WriteTime>{dateToString2(props.video.createdAt)}</WriteTime>
        </VideoBox>
      </Link>
    </>
  )
}

export default Video

const VideoBox = styled.div`
  width: 210px;
  padding: 10px;
  text-align: center;

  &:hover {
    background-color: lightgrey;
  }
`
const Image = styled.img`
  width: 200px;
  height: 150px;
`
const Song = styled.h4`
  color: black;
  margin: 5px;
`
const WriteTime = styled.h4`
  color: grey;
  font-size: 0.6rem;
  margin: 5px;
`