import React from 'react'
import { Link } from 'react-router-dom'

import styled from "styled-components";

import { dateToString2, viewsToString } from "src/func"

function VideoRow(props) {
  return (
    <StyledLink to={`/video/${props.video.id}`}>
      <Container>
        <Box>
          <ImageBox>
            <Image src={`http://img.youtube.com/vi/${props.video.id}/0.jpg`} />
          </ImageBox>
        </Box>

        <Box style={{paddingLeft:'30px'}}>
          <h3>{props.video.song}</h3>
          <Text>{props.video.singer}</Text>
          <Text>
            {props.video.views ? viewsToString(props.video.views) : viewsToString(0)
            } • {
            dateToString2(props.video.createdAt)
            } • 좋아요 : {props.video.likes}
          </Text>
        </Box>
      </Container>
    </StyledLink>
  )
}

export default VideoRow

const Container = styled.div`
  width: 60%;
  margin: 20px auto;
  padding: 10px;
  border-bottom: 1px solid grey;
  display: flex;
  align-items: center;
`
const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
`
const Box = styled.div`
  flex: 0.5;
`
const ImageBox = styled.div`
  position: relative;
  width: 100%;
  padding-bottom: 75%;
`
const Image = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
`
const Text = styled.h4`
  font-size: 0.8rem;
  color: grey;
`