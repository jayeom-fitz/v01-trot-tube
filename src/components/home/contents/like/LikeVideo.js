import React from 'react'
import { Link } from 'react-router-dom'

import styled from "styled-components";

import { dateToString, dateToString2 } from "src/func"

function LikeVideo(props) {
  return (
    <>
      <Link to={`/video/${props.video.id}`} style={{textDecoration:'none'}}>
        <VideoBox>
          <Image src={`http://img.youtube.com/vi/${props.video.id}/0.jpg`} />
          <Singer>{props.video.singer}</Singer>
          <Song>{props.video.song}</Song>
          <WriteTime>{dateToString2(props.video.createdAt)}</WriteTime>
          <WriteTime>누른 시간 : {dateToString(props.video.liked)}</WriteTime>
        </VideoBox>
      </Link>
    </>
  )
}

export default LikeVideo

const VideoBox = styled.div`
  width: 250px;
  padding: 10px;
  text-align: center;

  &:hover {
    background-color: lightgrey;
  }
`
const Image = styled.img`
  width: 240px;
  height: 180px;
`
const Singer = styled.h4`
  color: grey;
  font-size: 0.8rem;
  margin: 5px;
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