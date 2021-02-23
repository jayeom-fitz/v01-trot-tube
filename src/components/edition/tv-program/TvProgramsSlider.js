import React, { useState, useEffect } from 'react'

import styled from 'styled-components'

import { storeService } from "../../../fbase";

import { AiFillLeftSquare,
         AiFillRightSquare,
         AiFillDownSquare,
         AiFillUpSquare } from 'react-icons/ai'

function TvProgramsSlider() {
  const [loaded, setLoaded] = useState(true);

  const [lefts, setLefts] = useState([]);
  const [rights, setRights] = useState([]);

  useEffect(() => {
    async function getTvPrograms() {
      var tvPrograms = [];
      await storeService.collection('tv-programs').get().then(function (snapshot) {
        let arr = [];
        snapshot.forEach(doc => arr.push({...doc.data(), id: doc.id}));
        tvPrograms = [...arr]; 
      })

      var homeSlider = [];
      await storeService.collection('admin').doc('home-slider').get().then(function (snapshot) {
        console.log(snapshot.docs);
        if(snapshot.docs === undefined) {
          console.log('무야호')
        }
      })
    }

    getTvPrograms();
  }, [])

  const onCheckClick = e => {
    const id = e.target.id;
    const idx = parseInt(id.substring(1));

    if(id[0] === 'L') {
      setLefts(
        lefts.map(v =>
          v.index === idx ? { ...v, checked: !v.checked } : v
        )
      );
    } else {
      setRights(
        rights.map(v =>
          v.index === idx ? { ...v, checked: !v.checked } : v
        )
      );
    }
  };

  const onHorizontalClick = e => {
    const id = e.target.id;

    if(id[0] === 'R') {
      var idx = rights.length;

      const arr = lefts.filter(left => left.checked);
      setRights(rights.concat(arr.map(left => {
        return {
          value: left.value,
          checked: false,
          index: ++idx
        }
      })));
      
      console.log(rights);

    } else {
      
    }
  };

  const onVerticalClick = e => {
    const id = e.target.id;

    if(id[0] === 'U') {
      
    } else {
      
    }
  };

  return (
    <>
      {loaded ? 
        <div style={{width:'100%'}}>
          <Container>
            <Title>홈 슬라이드</Title>
            
            <SliderContainer>
              <Box>
                {lefts.map((v) => 
                  <Content 
                    key={`L${v.index}`}
                    id={`L${v.index}`} 
                    onClick={onCheckClick}
                    active={v.checked}
                    >{v.value}
                  </Content>)}
              </Box>
              <ButtonBox>
                <RightArrow id="RightArrow" onClick={onHorizontalClick} size='48'/>
                <LeftArrow id="LeftArrow" onClick={onHorizontalClick} size='48'/>
              </ButtonBox>
              <Box>
                {rights.map((v) => 
                  <Content 
                    key={`R${v.index}`} 
                    id={`R${v.index}`} 
                    onClick={onCheckClick}
                    active={v.checked}
                    >{v.value}
                  </Content>)}
              </Box>
              <ButtonBox>
                <UpArrow id="UpArrow" onClick={onVerticalClick} size='48'/>
                <DownArrow id="DownArrow" onClick={onVerticalClick} size='48'/>
              </ButtonBox>
            </SliderContainer>
          </Container>
        </div>
      : null}
    </>
  )
}

export default TvProgramsSlider

const Container = styled.div`
  padding: 40px;
`
const Title = styled.h1`
  margin: 0;
`
const SliderContainer = styled.div`
  display: flex;
  margin: 20px 0;
`
const Box = styled.div`
  flex: 0.5;
  border: 1px solid black;
  margin: 10px;
`
const ButtonBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`
const Content = styled.div`
  margin: 10px;
  ${({active}) => active && `
    border: 2px solid red;
  `};
`
const LeftArrow = styled(AiFillLeftSquare)`
  display: flex;
  margin: 10px 0;
  cursor: pointer;
`
const RightArrow = styled(AiFillRightSquare)`
  display: flex;
  margin: 10px 0;
  cursor: pointer;
`
const UpArrow = styled(AiFillUpSquare)`
  display: flex;
  margin: 10px 0;
  cursor: pointer;
`
const DownArrow = styled(AiFillDownSquare)`
  display: flex;
  margin: 10px 0;
  cursor: pointer;
`