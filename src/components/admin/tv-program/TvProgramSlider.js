import React, { useState, useEffect } from 'react'

import styled from 'styled-components'

import { storeService } from "src/fbase";

import { AiFillLeftSquare,
         AiFillRightSquare,
         AiFillDownSquare,
         AiFillUpSquare } from 'react-icons/ai'

function TvProgramsSlider() {
  const [loaded, setLoaded] = useState(false);
  const [value, setValue] = useState(0);

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
  }, [value])

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
      setRights(rights.concat(lefts.filter(left => left.checked)));
      setLefts(lefts.filter(left => !left.checked));
    } else {
      setLefts(lefts.concat(rights.filter(right => right.checked)));
      setRights(rights.filter(right => !right.checked));
    }
  };

  const onVerticalClick = e => {
    const id = e.target.id;
    if(rights.length === 0) return;
    var arr = rights.slice();
    var i;
    if(id[0] === 'U') {
      if(rights[0].checked) return;
      for(i=1; i<arr.length; i++) {
        if(arr[i].checked) {
          const v = arr[i - 1];
          arr[i - 1] = arr[i];
          arr[i] = v;
        }
      }
    } else {
      if(rights[rights.length - 1].checked) return;
      for(i=arr.length-2; i>=0; i--) {
        if(arr[i].checked) {
          const v = arr[i + 1];
          arr[i + 1] = arr[i];
          arr[i] = v;
        }
      }
    }
    setRights(arr);
  };

  const onSave = () => {
    var index = 1;
    lefts.filter(left => left.sliderIndex !== 0).map(async function (v) {
      await storeService.collection('tv-programs').doc(v.id).update({
        sliderIndex: 0
      })
    })
    rights.map(async function (v) {
      await storeService.collection('tv-programs').doc(v.id).update({
        sliderIndex: index++
      })
    })
    alert('저장되었습니다.')
  }

  return (
    <>
      {loaded ? 
        <div style={{width:'100%'}}>
          <Container>
            <Title>홈 슬라이드</Title>

            <Button 
              color='#DC3545'
              onClick={() => setValue(value + 1)
              }>취소</Button>
            <Button 
              color='#007BFF'
              onClick={onSave}
              >저장</Button>

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
                <BoxTitle>홈 슬라이드 구성</BoxTitle>
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
const Button = styled.button`
  width: 75px;
  height: 50px;
  margin: 20px 20px 0 20px;
  font-weight: bold;

  border: 1px solid ${(props) => props.color};
  transition-duration: 0.4s;
  background-color: white;

  &:hover {
    color: white;
    background-color: ${(props) => props.color};
  }

  &:focus {
    outline: none;
    color: white;
    background-color: ${(props) => props.color};
  }
`
const SliderContainer = styled.div`
  display: flex;
  margin: 20px 0;
`
const Box = styled.div`
  flex: 0.5;
  height: 500px;
  border: 1px solid lightgrey;
  margin: 10px;
  overflow-y: auto;
`
const BoxTitle = styled.h4`
  margin: 0;
  border: 1px solid lightgrey;
  margin: 10px;
  text-align: center;
`
const ButtonBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`
const Content = styled.div`
  padding: 10px;
  text-align: center;
  
  transition: 0.3s;
  ${({active}) => active && `
    background-color: lightgrey;
  `};
`
const Image = styled.img`
  width: 50%;
  max-height: 150px;
  cursor: pointer;
`
const LeftArrow = styled(AiFillLeftSquare)`
  display: flex;
  margin: 10px 0;
  cursor: pointer;

  path {
    pointer-events: none;
  }

  &:hover {
    color : red;
  }
`
const RightArrow = styled(AiFillRightSquare)`
  display: flex;
  margin: 10px 0;
  cursor: pointer;

  path {
    pointer-events: none;
  }

  &:hover {
    color : red;
  }
`
const UpArrow = styled(AiFillUpSquare)`
  display: flex;
  margin: 10px 0;
  cursor: pointer;

  path {
    pointer-events: none;
  }

  &:hover {
    color : red;
  }
`
const DownArrow = styled(AiFillDownSquare)`
  display: flex;
  margin: 10px 0;
  cursor: pointer;

  path {
    pointer-events: none;
  }

  &:hover {
    color : red;
  }
`