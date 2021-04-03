import React, { useState, useEffect } from 'react' 
import { useParams } from "react-router-dom";
import uuid from 'react-uuid'

import styled from "styled-components";

import { storeService } from "src/fbase";

import ViewsAndLikes from './ViewsAndLikes'
import Comment from './Comment'

function Video(props) {
  const { vid } = useParams();

  const [loaded, setLoaded] = useState(false);
  const [video, setVideo] = useState(null);
  const [singer, setSinger] = useState([]);
  const [comments, setComments] = useState([]);
  const [isLiked, setIsLiked] = useState(false);
  const [myComment, setMyComment] = useState('');

  const [value, setValue] = useState(0);

  async function init() {
    const ref = storeService.collection('videos').doc(vid);

    await ref.get().then(function (doc) {
      setVideo({...doc.data()});
    })

    await ref.collection('singer').get().then(function (snapshot) {
      var array = [];
      snapshot.forEach(function (singer) {
        array.push({
          ...singer.data(),
          id: singer.id
        })
      })
      setSinger(array);
    })

    await ref.collection('comments').orderBy('createdAt', 'desc').limit(20)
      .get().then(function(snapshot) {
        var array = [];
        snapshot.forEach(function (data) {
          array.push({
            ...data.data(),
            id: data.id
          })
        })
        setComments(array);
      })

    setLoaded(true);
    setTimeout(() => setValue(value + 1), 1500);
    setTimeout(() => upViews(), 60000);
  }

  async function getLiked() {
    const ref = storeService.collection('videos').doc(vid);
    if(props.user !== null) {
      await ref.collection('liked').doc(props.user.uid).get().then(function (doc) {
        setIsLiked(doc.exists);
      })
    }
  }

  useEffect(() => {
    if(value === 0) init();
    getLiked();
  }, [value, props.user])
  
  async function upViews() {  
    const ref = storeService.collection('videos').doc(vid);

    await ref.get().then(function (doc) {
      var views = doc.data().views;
      
      if(views === undefined) 
        views = 1;
      else
        views++;
      
      ref.update({ views });
    })
  }

  async function onWriteComment() {
    const commentID = uuid()
    const comment = {
      uid: props.user.uid,
      name: props.user.nickname,
      image: props.user.photoURL,
      content: myComment, 
      createdAt: Date.now()
    };

    
    await storeService.collection('videos').doc(vid)
                      .collection('comments').doc(commentID).set({...comment});

    setComments([{
      id: commentID, ...comment
    }, ...comments]);
    setMyComment('');
  }

  return (
    <Container key='video'>
      {loaded && <>
        <Box flex='0.6'>
          <IframeBox>
            <Iframe 
              src={`https://www.youtube.com/embed/${vid}?autoplay=1`}
              title="YouTube video player" 
              frameBorder="0" 
              allow="
                accelerometer; autoplay; clipboard-write; 
                encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen />
          </IframeBox>

          <SongTitle>{video.song}</SongTitle>

          <ViewsAndLikes 
            video={video} 
            singer={singer}
            user={props.user}
            isLiked={isLiked}
            setIsLiked={setIsLiked}
          />
        </Box>

        <Box flex='0.4'>
          <div style={{marginBottom:'20px'}}>
            {props.user ? 
              <WriteComment>
                <Box flex='0.8' style={{padding:'10px'}}>
                  <CommentBox value={myComment} onChange={(e) => setMyComment(e.target.value)}/>
                </Box>
                <Box flex='0.2' style={{padding:'10px'}}>
                  <Button onClick={() => onWriteComment()}>
                    댓글입력
                  </Button>
                </Box>
              </WriteComment> 
              : <>
              <Box flex='1' style={{border:'1px solid lightgrey'}}>
                로그인 후 댓글 작성 가능
              </Box>
            </>}
          </div>
          {comments.length === 0 ? <>댓글이 없습니다.</> : <>
            {comments.map((comment) => <Comment key={comment.id} user={props.user} comment={comment}/>)}
          </>}
        </Box>
      </>}
    </Container>
  )
}

export default Video

const Container = styled.div`
  flex: 1;
  display: flex;
  background-color: #f9f9f9;
  padding: 10px;
`
const Box = styled.div`
  flex: ${(props) => props.flex || 1};
  padding: 20px;
`
const IframeBox = styled.div`
  position: relative;
  width: 100%;
  padding-bottom: 56.26%;
`
const Iframe = styled.iframe`
  position: absolute;
  width: 100%;
  height: 100%;
`
const SongTitle = styled.h2`
  padding-left: 10px;
`
const WriteComment = styled.div`
  display: flex;
`
const CommentBox = styled.textarea`
  width: 100%;
  height: 100px;
  resize: none;
`
const Button = styled.button`
  width: 100%;
  height: 100%;
`