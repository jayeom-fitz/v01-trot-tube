import React, { useState, useEffect } from 'react'
import styled from "styled-components"

import { storeService } from "src/fbase";

import Slider from 'react-slick'
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

import { Link } from 'react-router-dom'

import { GoGear } from 'react-icons/go'

function TvProgramSlider(props) {
  const [loaded, setLoaded] = useState(false);
  const [tvs, setTvs] = useState([]);

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 1000,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
  };
  
  useEffect(() => {
    async function getTvPrograms() {
      let arr = [];
      await storeService.collection('tv-programs')
                      .where('sliderIndex', '!=', '0')
                      .get().then(function (snapshot) {
        snapshot.forEach(doc => arr.push({...doc.data(), id: doc.id}));
      });

      setTvs([...arr.sort(function (a, b) {
        return a.sliderIndex - b.sliderIndex;
      })]);
      
      setLoaded(true);
    }

    getTvPrograms();
  }, [])

  return (
    <>
      {loaded ?
        <Container>
          {props.user && props.user.verified === 2 ? (
            <EditBar>
              <Link to={`/admin/${`tv-program-slider`}`} >
                <GoGear size='24' color='black'/>
              </Link>
            </EditBar>
          ) : null}

          <StyledSlider {...settings}>
            {tvs.map(tv => 
              <Link to={`/tv/${tv.id}`}>
                <ImageContainer key={tv.id}>
                  <Image src={tv.image} alt={tv.title} />
                </ImageContainer>
              </Link>
            )}
          </StyledSlider>
        </Container>
      : null}
    </>
  )
}

export default TvProgramSlider

const Container = styled.div`
  width: 600px;
  height: 240px;
  margin: 10px auto;
`
const EditBar = styled.div`
  width: 100%;
  text-align: right;
`
const StyledSlider = styled(Slider)`
  width: 600px;
  height: 100%;

  .slick-prev:before {
    color: red;
    font-size: 50px;
  }

  .slick-next:before {
    color: red;
    font-size: 50px;
  }

  .slick-prev { left: -55px }
`;
const ImageContainer = styled.div`
  height: 100%;
`;
const Image = styled.img`
  max-width: 500px;
  height: 200px;
  margin: 10px auto;
`;