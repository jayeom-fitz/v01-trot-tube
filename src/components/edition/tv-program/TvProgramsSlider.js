import React, { useState, useEffect } from 'react'

import styled from 'styled-components'

import { storeService } from "../../../fbase";

import { AiFillLeftSquare,
         AiFillRightSquare,
         AiFillDownSquare,
         AiFillUpSquare } from 'react-icons/ai'

function TvProgramsSlider() {
  const [loaded, setLoaded] = useState(false);

  const [lefts, setLefts] = useState([]);
  const [rights, setRights] = useState([]);

  useEffect(() => {
    async function getTvPrograms() {
      let arr = [];
      await storeService.collection('tv-programs').get().then(function (snapshot) {
        snapshot.forEach(doc => arr.push({...doc.data(), id: doc.id, checked: false}));
      });

      setLefts([...arr.filter(v => v.sliderIndex === 0)]);
      setRights([...arr.filter(v => v.sliderIndex !== 0).sort(function (a, b) {
        return a.sliderIndex - b.sliderIndex;
      })]);
      
      setLoaded(true);
    }

    getTvPrograms();
  }, [])

  const onCheckClick = e => {
    const id = e.target.id;
    const pid = id.substring(1);

    if(id[0] === 'L') {
      setLefts(
        lefts.map(v =>
          v.id === pid ? { ...v, checked: !v.checked } : v
        )
      );
    } else {
      setRights(
        rights.map(v =>
          v.id === pid ? { ...v, checked: !v.checked } : v
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
                  <Content key={`L${v.id}`} active={v.checked}>
                    <Image 
                      onClick={onCheckClick}
                      id={`L${v.id}`} alt=""
                      src={v.image} />
                  </Content>)}
              </Box>
              <ButtonBox>
                <RightArrow id="RightArrow" onClick={onHorizontalClick} size='48'/>
                <LeftArrow id="LeftArrow" onClick={onHorizontalClick} size='48'/>
              </ButtonBox>
              <Box>
                {rights.map((v) => 
                  <Content key={`R${v.id}`} active={v.checked}>
                    <Image 
                      onClick={onCheckClick}
                      id={`R${v.id}`} alt=""
                      src={v.image} />
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
  border: 1px solid lightgrey;
  margin: 10px;
`
const ButtonBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`
const Content = styled.div`
  padding: 10px;
  text-align: center;
  
  transition: 0.8s;
  ${({active}) => active && `
    background-color: lightgrey;
  `};
`
const Image = styled.img`
  width: 50%;
  height: 50%;
  cursor: pointer;
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