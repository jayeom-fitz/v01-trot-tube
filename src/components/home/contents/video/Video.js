import React, { useState, useEffect } from 'react' 
import { useParams } from "react-router-dom";

import styled from "styled-components";

import { storeService } from "src/fbase";

function Video() {
  const { vid } = useParams();

  const [loaded, setLoaded] = useState(false);
  const [video, setVideo] = useState(null);
  const [singer, setSinger] = useState([]);

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

    setLoaded(true);
    setTimeout(() => setValue(value + 1), 1500);  
  }

  useEffect(() => {
    if(value === 0) init();
  }, [value])
  
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
          <div>aaa</div>
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
  padding: 10px;
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

`