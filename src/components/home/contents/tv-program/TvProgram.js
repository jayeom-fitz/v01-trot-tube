import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";

import styled from 'styled-components';

import { storeService } from 'src/fbase'

import Avatar from '@material-ui/core/Avatar'

import Videos from '../video/Videos';
import AddVideo from '../video/AddVideo';

function TvProgram(props) {
  const { tpid } = useParams();

  const [loaded, setLoaded] = useState(false);
  const [tvProgram, setTvProgram] = useState(null);
  const [directories, setDirectories] = useState([]);
  const [people, setPeople] = useState([]);
  const [value, setValue] = useState(0);

  const [person, setPerson] = useState(null);
  const [videos, setVideos] = useState([]);
  const [isMore, setIsMore] = useState(true);

  async function getTvProgram() {
    await storeService.collection('tv-programs').doc(tpid).get().then(function (doc) {
      setTvProgram(doc.data());
    })
  }

  async function getDirectories() {
    var dir = []; var pp = [];
    const dirRef = storeService.collection('tv-programs').doc(tpid);

    await dirRef.collection('directories').get().then(function (snapshot) {
      snapshot.forEach(doc => dir.push({
        ...doc.data(), id: doc.id
      }));
    });

    await dirRef.collection('people').get().then(function (snapshot) {
      var index = 0;
      snapshot.forEach(async function (doc) {
        await storeService.collection('people').doc(doc.id).get().then(function (person) {
          pp.push({
            id: doc.id,
            dir: doc.data().dir, 
            name: person.data().name,
            image: person.data().image,
            index: index++
          })      
        }) 
      });
    });

    setDirectories(dir.sort(function (a,b) {
      return a.index - b.index;
    })); setPeople(pp);
  }

  function init() {
    getTvProgram(); 
    getDirectories();
    setTimeout(() => setLoaded(true), 1500);  
  }

  useEffect(() => {
    if(value === 0) init();
  }, [value])

  async function getVideosOfPerson(index) {
    if(person === null || (index !== person.index)) {
      setPerson(people[index]); setIsMore(true);

      await storeService.collection('people').doc(people[index].id)
        .collection('videos').where('tpid', '==', tpid).orderBy('createdAt', 'desc').limit(10)
        .get().then(function (snapshot) {
          if(snapshot.empty || snapshot.size % 10 !== 0) 
            setIsMore(false);

          var arr = [];
          snapshot.forEach(async function(doc) {
            await storeService.collection('videos').doc(doc.id).get().then(function (video) {
              arr.push({
                ...video.data(),
                id: doc.id
              })      
            }) 
          })
          setVideos(arr);
        })
      setTimeout(() => setValue(value + 1), 500);
    }
    document.getElementById("videos").style.right = "0";
  }

  async function getMoreVideos() {
    await storeService.collection('people').doc(person.id)
      .collection('videos').where('tpid', '==', tpid)
      .orderBy('createdAt', 'desc').startAfter(videos[videos.length-1].createdAt).limit(10)
      .get().then(function (snapshot) {
        if(snapshot.empty || snapshot.size % 10 !== 0) 
          setIsMore(false);

        var arr = videos.slice();
        snapshot.forEach(async function(doc) {
          await storeService.collection('videos').doc(doc.id).get().then(function (video) {
            arr.push({
              ...video.data(),
              id: doc.id
            })      
          }) 
        })
        setVideos(arr);
      })
    setTimeout(() => setValue(value + 1), 500);
  } 

  return (
    <Container>
      {loaded && tvProgram && <>
        {props.user && props.user.verified === 2 && person && <>
          <AddVideo person={person} />
        </>}
        
        <Videos 
          person={person}
          videos={videos}
          verified={props.user ? props.user.verified : 0}
          isMore={isMore}
          getMoreVideos={getMoreVideos}
        />

        <Title>
          <Image src={tvProgram.image} />
        </Title>
        
        <Directories>
          {directories.length === 0 ? <>디렉토리가 없습니다</> :
            directories.map((directory) => 
            <Directory key={directory.id}>
              <DirectoryTitle 
                tcolor={directory.textColor}
                bcolor={directory.bgColor}
              >
                <span>{directory.title}</span>
              </DirectoryTitle>

              <People bcolor={directory.bgColor}>
              {people.filter((person) => person.dir === directory.id)
                .map((p) => (
                  <PersonCard 
                    key={`person-${p.id}`}
                    onClick={() => getVideosOfPerson(p.index)}
                  >
                    <StyledAvatar src={p.image} />
                    <Name>{p.name}</Name>
                  </PersonCard>
              ))}
              </People>
            </Directory>
            )
          }
        </Directories>
      </>}
    </Container>
  )
}

export default TvProgram

const Container = styled.div`
  flex: 1;
  background-color: #f9f9f9;
  padding: 20px;
`
const Title = styled.div`
  text-align: center;
  padding-bottom: 30px;
`
const Image = styled.img`
  width: 50%;
`
const Directories = styled.div`
  width: 100%;
  padding: 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`
const Directory = styled.div`
  padding: 10px;
`
const DirectoryTitle = styled.div`
  display: flex;
  width: 200px;
  height: 20px;
  padding: 5px;
  justify-content: center;
  color: #${(props) => props.tcolor || 'ffffff'};
  background-color: #${(props) => props.bcolor || '000000'};
`
const People = styled.div`
  min-width: 200px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  border: 1px solid #${(props) => props.bcolor || '000000'};
`
const PersonCard = styled.div`
  width: 150px;
  padding-top: 10px;
  cursor: pointer;

  &:hover {
    background-color: lightgrey;
  }
`
const StyledAvatar = styled(Avatar)`
  width: 120px !important;
  height: 120px !important;
  margin: auto;
  border: 1px solid lightgrey;
`
const Name = styled.h4`
  text-align: center;
  padding: 10px;
  margin: 0;
`