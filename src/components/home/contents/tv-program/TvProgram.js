import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";

import styled from 'styled-components';

import { storeService } from 'src/fbase'

import Avatar from '@material-ui/core/Avatar'

function TvProgram(props) {
  const { tpid } = useParams();

  const [loaded, setLoaded] = useState(false);
  const [tvProgram, setTvProgram] = useState(null);
  const [directories, setDirectories] = useState([]);
  const [people, setPeople] = useState([]);

  async function getTvProgram() {
    await storeService.collection('tv-programs').doc(tpid).get().then(function (doc) {
      setTvProgram(doc.data());
    })
  }

  async function getDirectories() {
    var dir = []; var pp = []; var arr = [];
    const dirRef = storeService.collection('tv-programs').doc(tpid);

    await dirRef.collection('directories').get().then(function (snapshot) {
      snapshot.forEach(doc => dir.push({
        ...doc.data(), id: doc.id
      }));
    });

    await dirRef.collection('people').get().then(function (snapshot) {
      snapshot.forEach(async function (doc) {
        await storeService.collection('people').doc(doc.id).get().then(function (person) {
          pp.push({
            id: doc.id,
            dir: doc.data().dir, 
            name: person.data().name,
            image: person.data().image
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
    setTimeout(() => setLoaded(true), 2000);  
  }

  useEffect(() => init(), [])

  return (
    <Container>
      {loaded && tvProgram && <>
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
                  <PersonCard key={`person-${p.id}`}>
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