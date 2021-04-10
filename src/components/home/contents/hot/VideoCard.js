import React from 'react' 
import { Link } from "react-router-dom";

import styled from "styled-components";

import { dateToString2, viewsToString } from "src/func"

function VideoCard(props) {
  return (
    <Container>
      <Link to={`/video/${props.video.id}`} style={{textDecoration:'none', color:'black'}}>
        <VideoRow>
          <RankBox>
            <Rank>{props.video.index}</Rank>
          </RankBox>

          <ImageBox>
            <Image src={`http://img.youtube.com/vi/${props.video.id}/0.jpg`}/>
          </ImageBox>

          <ContentBox>
            <Content>{props.video.singer}</Content>

            <Content>{props.video.song}</Content>

            <Content color='grey' style={{fontSize:'0.8rem'}}>
              {viewsToString(props.video.views)
              } • 좋아요 : {props.video.likes
              } • {dateToString2(props.video.createdAt)}
            </Content>
          </ContentBox>
        </VideoRow>
      </Link>
    </Container>
  )
}

export default VideoCard

const Container = styled.div`
  flex: 1;
  background-color: #f9f9f9;
  padding: 0px 10px;
  margin-bottom: 20px;
`
const VideoRow = styled.div`
  display: flex;
  align-items: center;
  width: 90%; 
  margin: auto;
`
const RankBox = styled.div`
  flex: 0.1;
`
const Rank = styled.h1`
  
`
const ImageBox = styled.div`
  flex: 0.4;
`
const Image = styled.img`
  width: 100%;
`
const ContentBox = styled.div`
  flex: 0.5;
  flex-direction: column;
`
const Content = styled.h4`
  padding-left: 50px;
  color: ${(props) => props.color || 'black'};
`

const UserName = styled.h4`
  display: flex;
  align-items: center;
  justify-content: space-between;  
`
const JoinDate = styled.p`
  color: #606060;
  font-size: small !important;
`