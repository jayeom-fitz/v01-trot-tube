import React, { useState, useEffect } from 'react' 
import { useParams } from "react-router-dom";

import styled from "styled-components";

import { storeService } from "src/fbase";

import { MdThumbUp } from 'react-icons/md'

function Video(props) {
  const { vid } = useParams();

  const [loaded, setLoaded] = useState(false);
  const [video, setVideo] = useState(null);
  const [singer, setSinger] = useState([]);
  const [isLiked, setIsLiked] = useState(false);

  const [value, setValue] = useState(0);

  async function init() {
    const ref = storeService.collection('videos').doc(vid);

    await ref.get().then(function (doc) {
      setVideo({...doc.data()});
    })

    await ref.collection('singer').get().then(function (singers) {
      var array = [];
      singers.forEach(function (singer) {
        array.push({
          ...singer.data(),
          id: singer.id
        })
      })
      setSinger(array);
    })

    if(props.user) {
      await ref.collection('liked').doc(props.user.uid).get().then(function (doc) {
        setIsLiked(doc.exists);
      })
    }

    setLoaded(true);
    setTimeout(() => setValue(value + 1), 1500);
    setTimeout(() => upViews(), 60000);
  }

  useEffect(() => {
    if(value === 0) init();
  }, [value])
  
  async function upViews() {  
    const ref = storeService.collection('videos').doc(vid);

    await ref.get().then(function (doc) {
      var views = doc.data().views;
      
      if(views === undefined) 
        views = 1;
      else
        views++;
      
      ref.update({ views });
    })
  }

  function viewsToString(views) {
    views = parseInt(views);
    var v = views % 1000; views = parseInt(views/1000);
    for(;views !== 0; views = parseInt(views/1000)) {
      v = views % 1000 + ',' + v;
    }
    return '조회수 : ' + v + '회';
  }

  function dateToString(now) {
    var date = new Date(now).toString().split(' ');
    var month;
    switch (date[1]) {
      case 'Jan': month = 1; break;
      case 'Feb': month = 2; break;
      case 'Mar': month = 3; break;
      case 'Apr': month = 4; break;
      case 'May': month = 5; break;
      case 'Jun': month = 6; break;
      case 'Jul': month = 7; break;
      case 'Aug': month = 8; break;
      case 'Sep': month = 9; break;
      case 'Oct': month = 10; break;
      case 'Nov': month = 11; break;
      default: month = 12; break;
    }
    return date[3] + '. ' + month + '. ' + date[2] + '. ';
  }

  const onThumbUpClick = async () => {
    if(!props.user) alert('로그인이 필요합니다.');
    const ref = storeService.collection('videos').doc(vid);

    await ref.get().then(async function (doc) {
      var likes = doc.data().likes;

      if(isLiked) {
        likes--;
        await ref.collection('liked').doc(props.user.uid).delete();
        await storeService.collection('users').doc(props.user.uid)
                        .collection('likedVideos').doc(vid).delete();
      } else {
        likes++;
        await ref.collection('liked').doc(props.user.uid).set({
          clicked: Date.now()
        })
        await storeService.collection('users').doc(props.user.uid)
                        .collection('likedVideos').doc(vid).set({
                          liked: Date.now()
                        });
      }
  
      await ref.update({ likes });
    })

    setIsLiked(!isLiked);
  }

  return (
    <Container>
      {loaded && <>
        <Box flex='0.6'>
          <IframeBox>
            <Iframe 
              src={`https://www.youtube.com/embed/${vid}?autoplay=1`}
              title="YouTube video player" 
              frameBorder="0" 
              allow="
                accelerometer; autoplay; clipboard-write; 
                encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen />
          </IframeBox>

          <SongTitle>{video.song}</SongTitle>

          <SubTitle>
            {video.views ? viewsToString(video.views) : viewsToString(0)
            } • {
            dateToString(video.createdAt)
            } • 좋아요 : {video.likes}
            <ThumbUp 
              size='18' color={isLiked ? 'blue' : 'grey'}
              onClick={onThumbUpClick}
            />
          </SubTitle>
        </Box>

        <Box flex='0.4'>
          aaa
        </Box>
      </>}
    </Container>
  )
}

export default Video

const Container = styled.div`
  flex: 1;
  display: flex;
  background-color: #f9f9f9;
  padding: 10px;
`
const Box = styled.div`
  flex: ${(props) => props.flex || 1};
  padding: 20px;
`
const IframeBox = styled.div`
  position: relative;
  width: 100%;
  padding-bottom: 56.26%;
`
const Iframe = styled.iframe`
  position: absolute;
  width: 100%;
  height: 100%;
`
const SongTitle = styled.h2`
  padding-left: 10px;
`
const SubTitle = styled.h4`
  padding-left: 10px;
  margin: 0;
  color: grey;
  font-weight: 300;
`
const ThumbUp = styled(MdThumbUp)`
  padding-left: 20px;
  cursor: pointer;
`