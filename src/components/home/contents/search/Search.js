import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";

import styled from "styled-components";

import { storeService } from "src/fbase";

import PersonRow from './PersonRow';
import VideoRow from './VideoRow';
import Loading from 'src/components/effect/Loading';

function Search() {
  const { searchContent } = useParams();

  const [loaded, setLoaded] = useState(false);
  const [search, setSearch] = useState([]);

  async function getPerson(str) {
    const sum = str.length === 1 ? str[0] : str[0] + ' ' + str[1];
    var array = [];

    const pref = storeService.collection('people');
    const vref = storeService.collection('videos');

    await pref.where('name', '==', `${str[0]}`).orderBy('likes', 'desc')
      .limit(5).get().then(function(snapshot) {
        snapshot.forEach(function(doc){
          array.push({
            ...doc.data(),
            id: doc.id,
            isPerson: true
          })
        })
      })

    if(array.length === 0) {
      await vref.where('song', '>=', `${sum}`)
        .limit(10).get().then(function(snapshot) {
          snapshot.forEach( function(doc){
            array.push({
              ...doc.data(),
              id: doc.id,
              isPerson: false
            })
          })
        })
    } else {
      var array2 = [];
      const length = array.length;

      for(var i=0; i<length; i++) {
        await pref.doc(array[i].id).collection('videos')
          .where('song', '>=', `${str.length === 1 ? '' : str[1]}`)
          .limit(5).get().then(function(snapshot) {
            snapshot.forEach(function(doc){
              array2.push(doc.id);
            })
          })
      }

      for(var i=0; i<array2.length; i++) {
        await vref.doc(array2[i]).get().then(function (v) {
          array.push({
            ...v.data(),
            id: array2[i],
            isPerson: false
          })
        })
      }
    }

    for(var i=0; i<array.length; i++) {
      if(array[i].isPerson) continue;
      var singer = '';
  
      await pref.doc(array[i].id).collection('singer').get().then(function (p) {
        p.forEach(function(person) {
          if(singer === '') singer = person.data().name;
          else singer = singer + ', ' + person.data().name;
        })
      })
         
      array[i].singer = singer;
    }

    setSearch(array);
  }

  async function getData() {
    const split = searchContent.split('+');
    
    if(split.length === 0) {
      alert('검색 키워드가 잘못되었습니다.'); return;
    } else if(split.length === 1) {
      await getPerson([split[0]]);
    } else {
      await getPerson([split[0], split[1]]);
    }

    setLoaded(true);
  }

  useEffect(() => {
    getData();
  }, [])

  return (
    <Container>
      {loaded ?
      <Content>
        {search && search.map((data) => 
          data.isPerson ? 
            <PersonRow key={data.id} person={data} />
          :
            <VideoRow key={data.id} video={data} />
        )}
      </Content>
      : <>
        <Loading />
      </>}
    </Container>
  )
}

export default Search

const Container = styled.div`
  flex: 1;
  background-color: #f9f9f9;
  padding: 0px 10px;
  padding-bottom: 0;
`
const Content = styled.div`
  width: 80%;
  margin: auto;
  border: 1px solid grey;
`