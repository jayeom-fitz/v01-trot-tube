import React, { useState, useEffect } from 'react'

import styled from "styled-components";

import { storeService } from "src/fbase";

import LikeVideo from './LikeVideo';

function Like(props) {
  const [loaded, setLoaded] = useState(false);
  const [videos, setVideos] = useState([]);

  const [more, setMore] = useState(true);
  const [delay, setDelay] = useState(false);

  async function getVideos() {
    var array = [];

    const ref = storeService.collection('users').doc(props.user.uid);
    const vref = storeService.collection('videos');

    await ref.collection('likedVideos').orderBy('liked', 'desc').limit(10).get()
      .then(function (snapshot) {
        snapshot.forEach(async function(doc) {
          var singer = '';
          var data ;
          
          await vref.doc(doc.id).get().then(function(d) {
            data = d.data();
          });

          await vref.doc(doc.id).collection('singer').get().then(function (p) {
            p.forEach(function(person) {
              if(singer === '') singer = person.data().name;
              else singer = singer + ', ' + person.data().name;
            })
          })

          array.push({
            ...doc.data(), ...data,
            id: doc.id,
            singer
          })
        })
      })
    
    setVideos(array);
  }

  function init() {
    getVideos(); 
    setTimeout(() => setLoaded(true), 1000); 
  }

  useEffect(() => {
    if(props.user) init();
  }, [props.user])

  const moreVideos = async () => {
    if(delay) {
      return;
    } else {
      setDelay(true); setTimeout(() => setDelay(false), 1000);
    }
    
    var array = videos.slice();

    const ref = storeService.collection('users').doc(props.user.uid);
    const vref = storeService.collection('videos');

    await ref.collection('likedVideos').orderBy('liked', 'desc')
      .startAfter(videos[videos.length-1].liked).limit(10)
      .get().then(function (snapshot) {
        snapshot.forEach(async function (doc) {
          var singer = '';
          var data ;
          
          await vref.doc(doc.id).get().then(function(d) {
            data = d.data();
          });

          await vref.doc(doc.id).collection('singer').get().then(function (p) {
            p.forEach(function(person) {
              if(singer === '') singer = person.data().name;
              else singer = singer + ', ' + person.data().name;
            })
          })

          array.push({
            ...doc.data(), ...data,
            id: doc.id,
            singer
          })
        })
        
        if(snapshot.size === 0) setMore(false);
        setVideos(array);
      })
  }

  return (
    <Container>
      {loaded && <>
        <Title>좋아요 누른 영상</Title>

        <Videos>
          {videos && 
            videos.map((video) => <LikeVideo key={video.id} video={video} />)
          }
        </Videos>
        
        {more &&
          <div style={{textAlign:'center', width:'100%'}}>
            <Button onClick={moreVideos}>더 보기</Button>
          </div>
        }
      </>}
    </Container>
  )
}

export default Like

const Container = styled.div`
  flex: 1;
  background-color: #f9f9f9;
  padding: 0px 10px;
  padding-bottom: 0;
`
const Title = styled.h2`
  text-align: center;
  padding-top: 20px;
`
const Videos = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`
const Button = styled.button`
  width: 80%;
  height: 50px;
`