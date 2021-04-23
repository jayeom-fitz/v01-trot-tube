import React from 'react'
import { Link } from 'react-router-dom'

import styled from "styled-components";

import { storeService } from "src/fbase";
import { dateToString2 } from "src/func"

import Avatar from "@material-ui/core/Avatar";
import { ImCross } from 'react-icons/im'
import { FcLock } from 'react-icons/fc'

function Comment(props) {
  async function removeComment() {
    await storeService.collection('visits').doc(props.comment.id).delete();    

    props.deleteComment(props.comment.id);
    alert('삭제되었습니다..'); 
  }

  return (
    <Container>
      <Title>
        <StyledLink to={`/user/${props.comment.uid}`}>
          <StyledAvatar src={props.comment.photoURL}/>
        </StyledLink>
        
        <StyledLink to={`/user/${props.comment.uid}`}>
          <Name>{props.comment.nickname}</Name>
        </StyledLink>
          
        <WriteDate>{dateToString2(props.comment.createdAt)}</WriteDate>

        {props.user && (props.user.uid === props.comment.uid || props.user.verified === 2) &&
          <div style={{paddingLeft:'30px'}}>
            <ImCross style={{cursor:'pointer'}} onClick={() => removeComment()}/>
          </div>
        }
      </Title>
      
      <Content> 
        <TextArea>
        {props.comment.secret && 
          !(props.user && (props.user.uid === props.comment.uid || props.user.verified === 2)) ?
            <div style={{paddingLeft:'30px'}}>
              <FcLock /> 비밀글 입니다.
            </div> :
            props.comment.content
        }
        </TextArea>
      </Content>
    </Container>
  )
}

export default Comment

const Container = styled.div`
  width: 70%;
  margin: 20px auto;
  padding: 10px;
  border: 1px solid grey;
  box-shadow: 5px 5px 5px 5px lightgrey;
`
const Title = styled.div`
  display: flex;
  align-items: center;
`
const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
`
const StyledAvatar = styled(Avatar)`
  height: 80px !important;
  width: 80px !important;
  margin: 10px 30px;
  border: 1px solid grey;
`
const Name = styled.h3`
  padding: 0 30px;
`
const WriteDate = styled.h4`
  padding: 0 30px;
  font-size: 0.8rem;
  color: grey;
`
const Content = styled.div`
  margin: 0 30px;
`
const TextArea = styled.div`
  width: 100%;
  padding: 10px;
  border: 1px solid lightgrey;
`