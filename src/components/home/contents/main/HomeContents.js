import React, { useState, useEffect } from 'react'

import styled from "styled-components";

import { storeService } from "src/fbase";

import TvProgramSlider from './TvProgramSlider';
import RecentVideos from './RecentVideos';
import Loading from 'src/components/effect/Loading';

function HomeContents(props) {
  const [loaded, setLoaded] = useState(false);
  const [tvs, setTvs] = useState([]);
  const [videos, setVideos] = useState([]);
    
  async function getTvPrograms() {
    let arr = [];
    await storeService.collection('tv-programs')
                    .where('sliderIndex', '!=', 0)
                    .get().then(function (snapshot) {
      snapshot.forEach(doc => arr.push({...doc.data(), id: doc.id}));
    });

    setTvs([...arr.sort(function (a, b) {
      return a.sliderIndex - b.sliderIndex;
    })]);
  }

  async function getRecentVideos() {
    var array = [];

    const ref = storeService.collection('videos');

    await ref.orderBy('createdAt', 'desc').limit(20).get()
      .then(function (snapshot) {
        snapshot.forEach(function (doc) {
          array.push({
            ...doc.data(),
            id: doc.id,
          })
        })
      })
      
    for(var i=0; i<array.length; i++) {
      var singer = '';
  
      await ref.doc(array[i].id).collection('singer').get().then(function (p) {
        p.forEach(function(person) {
          if(singer === '') singer = person.data().name;
          else singer = singer + ', ' + person.data().name;
        })
      })
         
      array[i].singer = singer;
    }

    setVideos(array);
  }

  async function init() {
    await getTvPrograms(); 
    await getRecentVideos();
    setLoaded(true);
  }

  useEffect(() => {
    init();
  }, [])
  
  return (
    <Container>
      {loaded ? <>
        <TvProgramSlider user={props.user} tvs={tvs}/>
        <RecentVideos videos={videos} />
      </> : <>
        <Loading />
      </>}
    </Container>
  )
}

export default HomeContents

const Container = styled.div`
  flex: 1;
  background-color: #f9f9f9;
  padding: 0px 10px;
  padding-bottom: 0;
`