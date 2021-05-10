import React, { useState, useEffect } from 'react'

import styled from "styled-components";

import { storeService } from "src/fbase";

import Write from './Write';
import Comment from './Comment';
import Loading from 'src/components/effect/Loading';

function GuestBook(props) {
  const [loaded, setLoaded] = useState(false);
  const [comments, setComments] = useState([]);

  const [isMore, setIsMore] = useState(true);
  const [delay, setDelay] = useState(false);
  const [value, setValue] = useState(0);

  async function getComments() {
    var array = [];

    await storeService.collection('visits')
      .orderBy('createdAt','desc').limit(5).get().then(function (snapshot) {
        snapshot.forEach(function(doc) {
          array.push({
            ...doc.data(),
            id: doc.id
          })
        })
        if(array.length < 5) setIsMore(false);
        setComments(array); setLoaded(true); setValue(value + 1);
      })

  }

  useEffect(() => {
    if(value === 0) {
      getComments();
    }
  }, [value])

  function addComment(comment) {
    setComments([comment, ...comments]);
  }

  function deleteComment(id) {
    var array = [];
    for(var i=0; i<comments.length; i++) {
      if(comments[i].id !== id)
        array.push(comments[i]);
    }
    setComments(array);
  }
  
  async function moreGetComments() {
    if(delay) {
      return;
    } else {
      setDelay(true); setTimeout(() => setDelay(false), 1000);
    }

    var array = [];

    await storeService.collection('visits').orderBy('createdAt', 'desc')
            .startAfter(comments[comments.length-1].createdAt).limit(5)
            .get().then(function (snapshot) {
              snapshot.forEach(function (data) {
                array.push({
                  ...data.data(),
                  id: data.id
                })
              })

              if(array.length === 0) {
                setIsMore(false);
              } else {
                setComments([...comments, ...array]);
              }
              setValue(value + 1);
            })
  }

  return (
    <Container id='guestbook'>
    {loaded ? <>
      <Content>
        <Write user={props.user} addComment={addComment}/>

        <Content>
        {comments && 
          comments.map((comment) => 
            <Comment 
              key={comment.id} 
              comment={comment} 
              user={props.user}
              deleteComment={deleteComment}/>)
        }
        </Content>
        
        {isMore &&
        <div style={{textAlign:'center'}}>
          <button style={{width:'50%', height:'50px', margin:'20px auto'}} 
                  onClick={moreGetComments}>더 보기</button>
        </div>
        }
      </Content>
    </> : <>
      <Loading />
    </>}
    </Container>
  )
}

export default GuestBook

const Container = styled.div`
  flex: 1;
  background-color: #f9f9f9;
  padding: 0px 10px;
  padding-bottom: 0;
`
const Content = styled.div`
  width: 80%;
  margin: auto;
`
