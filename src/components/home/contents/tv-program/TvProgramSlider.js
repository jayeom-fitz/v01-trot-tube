import React from 'react'
import { Link } from 'react-router-dom'

import styled from "styled-components"

import Slider from 'react-slick'
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

import { GoGear } from 'react-icons/go'

function TvProgramSlider(props) {
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

  return (
    <>
      {props.tvs &&
        <Container>
          {props.user && props.user.verified === 2 ? (
            <EditBar>
              <Link to={`/admin/${`tv-program-slider`}`} >
                <GoGear size='24' color='black'/>
              </Link>
            </EditBar>
          ) : null}

          <StyledSlider {...settings}>
            {props.tvs.map(tv => 
              <Link to={`/tv/${tv.id}`} key={tv.id}>
                <ImageContainer>
                  <Image src={tv.image} alt={tv.title} />
                </ImageContainer>
              </Link>
            )}
          </StyledSlider>
        </Container>
      }
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