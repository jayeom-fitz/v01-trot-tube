import React from 'react'
import { Link } from 'react-router-dom'

import styled from 'styled-components'

import { ImCross } from 'react-icons/im'
import Avatar from '@material-ui/core/Avatar'

function Videos(props) {
  return (
    <Container id='videos'>
      <Body>
        <Header>
          <CloseBar>
            <CloseIcon onClick={() => {
              document.getElementById("videos").style.right = "-100%";
            }}/>
          </CloseBar>
          
          {props.person &&
            <PersonRow>
              <StyledAvatar
                src={props.person.image}
                alt={props.person.name}
              />
              <PersonRowContent>
                <ContentTitle>{props.person.name}</ContentTitle> 
                <Link to={`/ch/${props.person.id}`} >
                  <Button>채널로...</Button>
                </Link>
                {props.person && props.verified === 2 &&
                  <Button onClick={() => {
                    document.getElementById("addVideo").style.right = "0";
                  }}>영상 추가</Button>
                }
              </PersonRowContent>
            </PersonRow>
          }
        </Header>
        
        <Content>
          {props.videos.map((video) => (
            <Link key={video.id} to={`/video/${video.id}`} style={{textDecoration:'none'}}>
              <VideoBox>
                <Image src={`http://img.youtube.com/vi/${video.id}/0.jpg`} />
                <h4 style={{color:'black'}}>{video.song}</h4>
              </VideoBox>
            </Link>
          ))}
          {props.isMore && <>
            <MoreButton onClick={() => props.getMoreVideos()}>
              더보기
            </MoreButton>
          </>}
        </Content>
      </Body>
    </Container>
  )
}

export default Videos

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 200;
  top: 0;
  right: -100%;
  background-color: #eee;
  overflow-x: hidden;
  transition: 0.8s;
  border-left: 1px solid grey;
  ::-webkit-scrollbar {
    display: none;
  }
`
const Body = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px;
`
const Header = styled.div`
  width: 100%;
  position: fixed;
  top: 0;
  background-color: #eee;
  z-index: 2;
  padding: 20px;
`
const CloseBar = styled.div`
  text-align: left;
`
const CloseIcon = styled(ImCross)`
  color: black;
  cursor: pointer;
`
const PersonRow = styled.div`
  display: flex;
  align-items: center;
  width: 90%; 
`
const StyledAvatar = styled(Avatar)`
  height: 120px !important;
  width: 120px !important;
  margin: 10px 60px;
  border: 2px solid lightgrey;
`
const PersonRowContent = styled.div`
  display: flex;
  flex-direction: row;
`
const ContentTitle = styled.h4`
  display: flex;
  align-items: center;
  justify-content: space-between;
`
const Button = styled.button`
  width: 75px;
  height: 40px;
  margin-left: 20px;
  border: none;
  transition-duration: 0.4s;
  background-color: #00C851;

  &:hover {
    color: white;
    background-color: #007E33;
  }
`
const Content = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  padding-top: 210px;
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
const MoreButton = styled.button`
  width: 250px;
  height: 200px;
  margin: 10px;
`