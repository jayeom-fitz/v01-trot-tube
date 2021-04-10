import React from 'react' 
import { Link } from "react-router-dom";

import styled from "styled-components";

import { dateToString2 } from "src/func"

import Avatar from "@material-ui/core/Avatar";
import { ImCross } from 'react-icons/im'

function Comment(props) {
  return (
    <Container>
      <div>
        <Link to={`/user/${props.comment.uid}`}>
          <StyledAvatar src={props.comment.image}/>
        </Link>
      </div>

      <div style={{paddingLeft:'10px'}}>
        <div style={{display:'flex'}}>
          <Name>
            <StyledLink to={`/user/${props.comment.uid}`}>
              {props.comment.name}
            </StyledLink>
          </Name>

          {props.user && ( props.user.uid === props.comment.uid || props.user.verified===2 ) && 
          <div style={{verticalAlign:'middle'}}>
            <StyledImCross size='12' onClick={() => props.onDeleteComment(props.comment.id)}/>
          </div>}

          <WriteDate>
            {dateToString2(props.comment.createdAt)}
          </WriteDate>
        </div>

        <div>
          <Content>
            {props.comment.content}
          </Content>
        </div>
      </div>   
    </Container>
  )
}

export default Comment

const Container = styled.div`
  flex: 1;
  display: flex;
  background-color: #f9f9f9;
  padding: 10px;

  &:hover {
    background-color: #c9c9c9;
  }
`
const StyledAvatar = styled(Avatar)`

`
const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
`
const Name = styled.div`
  padding-right: 10px;
`
const WriteDate = styled.div`
  font-size: 12px;
  color: grey;
  margin: auto 0;
`
const Content = styled.pre`
  overflow: auto;
  white-space: pre-wrap;
  word-break: break-all;
  margin-top: 5px;
`
const StyledImCross = styled(ImCross)`
  color: grey;
  padding-right: 10px;
  margin: 0;
  cursor: pointer;
`