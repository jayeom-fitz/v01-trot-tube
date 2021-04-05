import React from 'react'
import { Link } from 'react-router-dom'

import styled from "styled-components";

function RecentVideos(props) {
  return (
    <Container>
      <Title>최신 영상</Title>

      <Content>
        {props.videos && props.videos.map((video) => (
          <Link key={video.id} to={`/video/${video.id}`} style={{textDecoration:'none'}}>
            <VideoBox>
              <Image src={`http://img.youtube.com/vi/${video.id}/0.jpg`} />
              <Singer>{video.singer}</Singer>
              <Song>{video.song}</Song>
            </VideoBox>
          </Link>
        ))}
      </Content>
    </Container>
  )
}

export default RecentVideos

const Container = styled.div`
  width: 100%;
  padding: 20px;
  margin-top: 20px;
`
const Title = styled.h2`
  text-align: center;
  padding-top: 20px;
`
const Content = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`
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