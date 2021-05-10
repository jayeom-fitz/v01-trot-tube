import React, { useState, useEffect } from 'react'

import styled from "styled-components";

import { storeService } from "src/fbase";
import VideoCard from './VideoCard';
import Loading from 'src/components/effect/Loading';

function Hot() {
  const [loaded, setLoaded] = useState(false);
  const [hotVideoByLike, setHotVideoByLike] = useState([]);
  const [hotVideoByView, setHotVideoByView] = useState([]);

  async function getHotVideos() {
    const ref = storeService.collection('videos');

    var array = [];

    await ref.where('likes', '>=', 1).orderBy('likes', 'desc').limit(10).get()
      .then(function (snapshot) {
        var index = 1;
        snapshot.forEach(function(doc) {
          array.push({
            ...doc.data(),
            id: doc.id,
            index: index++
          })
        })
        
      })

    for(var i=0; i<array.length; i++) {
      var singer = '';

      await storeService.collection('videos').doc(array[i].id)
        .collection('singer').get().then(function (p) {
          p.forEach(function(person) {
            if(singer === '') singer = person.data().name;
            else singer = singer + ', ' + person.data().name;
          })
        })
      
      array[i].singer = singer;
    }

    setHotVideoByLike(array); array = [];

    await ref.where('views', '>=', 1).orderBy('views', 'desc').limit(10).get()
      .then(function (snapshot) {
        var index = 1;
        snapshot.forEach(function(doc) {
          array.push({
            ...doc.data(),
            id: doc.id,
            index: index++,
          }) 
        })
        
      })
    
    for(var i=0; i<array.length; i++) {
      var singer = '';
  
      await storeService.collection('videos').doc(array[i].id)
        .collection('singer').get().then(function (p) {
          p.forEach(function(person) {
            if(singer === '') singer = person.data().name;
            else singer = singer + ', ' + person.data().name;
          })
      })
       
      array[i].singer = singer;
    }

    setHotVideoByView(array); setLoaded(true);
  }

  useEffect(() => {
    getHotVideos(); 
  }, [])

  return (
    <>{loaded ?
      <Container>
        <Box flex='0.5'>
          <Title>좋아요</Title>
          {hotVideoByLike &&
            hotVideoByLike.map((v) => <VideoCard key={v.id} video={v} />)
          }
        </Box>

        <Box flex='0.5'>
          <Title>조회수</Title>
          {hotVideoByView &&
            hotVideoByView.map((v) => <VideoCard key={v.id} video={v} />)
          }
        </Box>
      </Container>
    :<>
      <Loading />
    </>}</>
  )
}

export default Hot

const Container = styled.div`
  flex: 1;
  display: flex;
  height: 100%;
  background-color: #f9f9f9;
  padding: 0 10px;
`
const Box = styled.div`
  flex: ${(props) => props.flex || 1};
  padding: 10px;
`
const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
`