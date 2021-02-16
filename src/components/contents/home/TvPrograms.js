import React from 'react'
import styled from "styled-components"

import Slider from 'react-slick'
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

import { Link } from 'react-router-dom'

import { GoGear } from 'react-icons/go'

function TvPrograms(props) {
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
    <Container>
      {props.user && props.user.verified === 2 ? (
        <EditBar>
          <Link to='/edit/tv' >
            <GoGear size='24' color='black'/>
          </Link>
        </EditBar>
      ) : null}

      <StyledSlider {...settings}>
        <ImageContainer>
          <Image src="https://w.namu.la/s/fee04aa663dd74e58a429ee9adb342f9cf8bbc9a4d0eea72640db58c0a8cff024f018cbcad15d6f8e28ee16f783913951882957580a1d6063f1077581d43f3143946d7747d66f121d13385f7a3c6b3253c144cced54a21a7af2a10b8fac2d43d" />
        </ImageContainer>

        <ImageContainer>
          <Image src="https://w.namu.la/s/5d969c40cd25cba90ac5159e11a9fd394bd3f4168c36212b5351aaf587a6d308f62959c8b5e4b1df3ff6897b5b9f8dcbea9e66030c4198ee86384376f6ed4b7ac8d2db415bdeba515867dc033e2396c72cf7168cd0722b3c4e5cb02241b5fbe85c45108d0e9417f246f12c578d54d320" />
        </ImageContainer>

        <ImageContainer>
          <Image src="https://w.namu.la/s/2ab896b0eff4c47dc827fda7a5e4db7f9c22089d25bae745280aeb88d75d5b3e4b454f95b4d779115dab697ec34b9806788e1d5f61de640ff781a2652c80b5762b224aa8b980c47403815a1dd5b58e80c7432c5e3b1dfda0e9ae48cdce73e428f3b53cb96f5a507a16d7271f215306b9" />
        </ImageContainer>
      </StyledSlider>
    </Container>
  )
}

export default TvPrograms

const Container = styled.div`
  width: 600px;
  height: 220px;
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