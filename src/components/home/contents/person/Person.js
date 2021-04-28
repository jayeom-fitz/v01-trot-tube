import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";

import styled from "styled-components";

import { storeService } from "src/fbase";

import PersonInfo from './PersonInfo';

function Person(props) {
  const { pid } = useParams();

  const [loaded, setLoaded] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [person, setPerson] = useState(null);
  const [tvPrograms, setTvPrograms] = useState([]);
  const [videos, setVideos] = useState([]);

  async function getData() {
    const pref = storeService.collection('people');
    const tref = storeService.collection('tv-programs');
    const vref = storeService.collection('videos');

    var array = [];
    var tvArray = [];
    var videoArray = [];

    await pref.doc(pid).get().then(function (doc) {
      setPerson({
        id: pid,
        ...doc.data()
      });
    })

    if(props.user !== null) {
      await pref.collection('liked').doc(props.user.uid).get().then(function (doc) {
        setIsLiked(doc.exists);
      })
    }

    // await pref.doc(pid).collection('tv-programs').get().then(function (snapshot) {
    //   snapshot.forEach(function (doc) {
    //     array.push(doc.id);
    //   })
    // })

    // for(var i=0; i<array.length; i++) {
    //   await tref.doc(array[i]).get().then(function (doc) {
    //     tvArray.push({
    //       id: doc.id,
    //       ...doc.data()
    //     })
    //   })
    // }

    // array = [];

    // await pref.doc(pid).collection('videos').orderBy('createdAt', 'desc').limit(20)
    //   .get().then(function (snapshot) {
    //     snapshot.forEach(function (doc) {
    //       array.push(doc.id);
    //     })
    //   })

    // for(var i=0; i<array.length; i++) {
    //   await vref.doc(array[i]).get().then(function (doc) {
    //     videoArray.push({
    //       id: doc.id,
    //       ...doc.data()
    //     })
    //   })
    // }

    // setTvPrograms(tvArray); setVideos(videoArray);

    setLoaded(true)
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <>
    {loaded && person && <>
      <Container>
        <PersonInfo 
          user={props.user} person={person} setPerson={setPerson}
          isLiked={isLiked} setIsLiked={setIsLiked}
        />
      </Container>
    </>}
    </>
  )
}

export default Person

const Container = styled.div`
  flex: 1;
  background-color: #f9f9f9;
  padding: 0px 10px;
  padding-bottom: 0;
`