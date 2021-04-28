import React from 'react'
import { Link, useParams } from "react-router-dom";

import styled from "styled-components";

import { storeService } from "src/fbase";

import Avatar from "@material-ui/core/Avatar";

import { GoGear } from 'react-icons/go'
import { MdThumbUp } from 'react-icons/md'

function PersonInfo(props) {
  const { pid } = useParams();

  const onThumbUpClick = async () => {
    if(!props.user) alert('로그인이 필요합니다.');

    const pref = storeService.collection('people').doc(props.person.id);
    const uref = storeService.collection('users').doc(props.user.uid);

    var likes = 0;

    await pref.get().then(function (doc) {
      likes = doc.data().likes;
    })

    if(props.isLiked) {
      likes--;
      await pref.collection('liked').doc(props.user.uid).delete();
      await uref.collection('likedPeople').doc(pid).delete();
    } else {
      likes++;
      await pref.collection('liked').doc(props.user.uid).set({
        clicked: Date.now()
      })
      await uref.collection('likedPeople').doc(pid).set({
        liked: Date.now()
      });
    }

    await pref.update({ likes });

    alert(props.isLiked ? 'disliked' : 'liked')

    var p = props.person; p.likes = likes; props.setPerson(p);
    props.setIsLiked(!props.isLiked);
  }
  
  return (
    <Container>
      <StyledAvatar src={props.person.image} />

      <Box>
        <h3>{props.person.name}</h3>
        <MdThumbUp 
          size='24' 
          style={{cursor:'pointer'}}
          color={props.isLiked ? 'blue' : 'grey'}
          onClick={onThumbUpClick}
        />
      </Box>

      <Box>
        <Like>생년월일 : {props.person.birth}</Like>
        <Like>소속사 : {props.person.company}</Like>
        <Like>좋아요 : {props.person.likes}</Like>
      </Box>

      {props.user && props.user.verified === 2 &&
        <Box>
          <StyledLink to={`/admin/person/${props.person.id}`}>
            <GoGear size='24'/>
          </StyledLink>
        </Box>
      }
    </Container> 
  )
}

export default PersonInfo

const Container = styled.div`
  width: 80%;
  margin: 20px auto;
  padding: 10px;
  border-bottom: 1px solid grey;
  display: flex;
  align-items: center;
`
const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
`
const StyledAvatar = styled(Avatar)`
  height: 140px !important;
  width: 140px !important;
  margin: 10px 30px;
  border: 1px solid grey;
`
const Box = styled.div`
  padding-left: 50px;
`
const Like = styled.h4`
  font-size: 0.8rem;
  color: grey;
`