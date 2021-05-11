import React, { useState, useEffect } from 'react'

import styled from "styled-components";

import { storeService } from "src/fbase";

import LikeVideo from './LikeVideo';
import Loading from 'src/components/effect/Loading';
import LikePeople from './LikePeople';

function Like(props) {
  const [loaded, setLoaded] = useState(false);
  const [videos, setVideos] = useState([]);
  const [people, setPeople] = useState([]);

  const [more, setMore] = useState(true);
  const [morePeople, setMorePeople] = useState(true);
  const [delay, setDelay] = useState(false);

  async function getVideos() {
    var array = [];

    const ref = storeService.collection('users').doc(props.user.uid);
    const vref = storeService.collection('videos');

    await ref.collection('likedVideos').orderBy('liked', 'desc').limit(10).get()
      .then(function (snapshot) {
        snapshot.forEach(function(doc) {
          array.push({
            ...doc.data(), 
            id: doc.id,
          })
        })
      })
    
    for(var i=0; i<array.length; i++) {
      var singer = '';  var data;
    
      await vref.doc(array[i].id).collection('singer').get().then(function (p) {
        p.forEach(function(person) {
          if(singer === '') singer = person.data().name;
          else singer = singer + ', ' + person.data().name;
        })
      })

      await vref.doc(array[i].id).get().then(function(d) {
        data = d.data();
      });
       
      array[i].singer = singer;
      array[i] = {...array[i], ...data}
    }
    
    if(array.length < 10) setMore(false);
    setVideos(array); 
  }

  async function getPeople() {
    var array = [];

    const ref = storeService.collection('users').doc(props.user.uid);
    const pref = storeService.collection('people');

    await ref.collection('likedPeople').orderBy('liked', 'desc').limit(10).get()
      .then(function (snapshot) {
        snapshot.forEach(function(doc) {
          array.push({
            ...doc.data(), 
            id: doc.id,
          })
        })
      })

    for(var i=0; i<array.length; i++) {
      await pref.doc(array[i].id).get().then(function (p) {
        array[i] = {...array[i], ...p.data()}
      })
    }
    
    if(array.length < 10) setMorePeople(false);
    setPeople(array); 
  }

  async function init() {
    await getVideos(); 
    await getPeople(); 
    setLoaded(true);
  }

  useEffect(() => {
    if(props.user) init(); 
  }, [props.user])

  const getMoreVideos = async () => {
    if(delay) {
      return;
    } else {
      setDelay(true); setTimeout(() => setDelay(false), 1000);
    }
    
    var array = [];

    const ref = storeService.collection('users').doc(props.user.uid);
    const vref = storeService.collection('videos');

    await ref.collection('likedVideos').orderBy('liked', 'desc')
      .startAfter(videos[videos.length-1].liked).limit(10)
      .get().then(function (snapshot) {
        snapshot.forEach(function (doc) {
          array.push({
            ...doc.data(),
            id: doc.id,
          })
        })
        
        if(snapshot.size === 0) setMore(false);
      })

    for(var i=0; i<array.length; i++) {
      var singer = '';  var data;
      
      await vref.doc(array[i].id).collection('singer').get().then(function (p) {
        p.forEach(function(person) {
          if(singer === '') singer = person.data().name;
          else singer = singer + ', ' + person.data().name;
        })
      })
  
      await vref.doc(array[i].id).get().then(function(d) {
        data = d.data();
      });
         
      array[i].singer = singer;
      array[i] = {...array[i], ...data}
    }

    setVideos([...videos, ...array]);
  }

  const getMorePeople = async () => {
    if(delay) {
      return;
    } else {
      setDelay(true); setTimeout(() => setDelay(false), 1000);
    }
    
    var array = [];

    const ref = storeService.collection('users').doc(props.user.uid);
    const pref = storeService.collection('people');

    await ref.collection('likedPeople').orderBy('liked', 'desc')
      .startAfter(people[people.length-1].liked).limit(10)
      .get().then(function (snapshot) {
        snapshot.forEach(function (doc) {
          array.push({
            ...doc.data(),
            id: doc.id,
          })
        })
        
        if(snapshot.size === 0) setMorePeople(false);
      })

    for(var i=0; i<array.length; i++) {
      await pref.doc(array[i].id).get().then(function (p) {
        array[i] = {...array[i], ...p.data()}
      })
    }

    setPeople([...people, ...array]);
  }

  return (
    <Container>
      {loaded ? <>
        {people && <>
          <Title>좋아요 누른 인물</Title>

          <Videos>
            {people.map((person) => 
              <LikePeople key={person.id} person={person} />)}
          </Videos>

          {morePeople &&
            <div style={{textAlign:'center', width:'100%'}}>
              <Button onClick={getMorePeople}>더 보기</Button>
            </div>
          }
        </>}

        {videos && <>
          <Title>좋아요 누른 영상</Title>

          <Videos>
            {videos.map((video) => 
              <LikeVideo key={video.id} video={video} />)}
          </Videos>
          
          {more &&
            <div style={{textAlign:'center', width:'100%'}}>
              <Button onClick={getMoreVideos}>더 보기</Button>
            </div>
          }
        </>}
      </> : <>
        <Loading />
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