import React, { useState, useEffect } from 'react' 
import { useParams } from "react-router-dom";
import uuid from 'react-uuid'

import styled from "styled-components";

import { storeService } from "src/fbase";

import ViewsAndLikes from './ViewsAndLikes'
import Comment from './Comment'
import Loading from 'src/components/effect/Loading';

function Video(props) {
  const { vid } = useParams();
  const ref = storeService.collection('videos').doc(vid);

  const [loaded, setLoaded] = useState(false);
  const [video, setVideo] = useState(null);
  const [singer, setSinger] = useState([]);
  const [comments, setComments] = useState([]);
  const [isLiked, setIsLiked] = useState(false);
  const [myComment, setMyComment] = useState('');

  const [value, setValue] = useState(0);
  const [delay, setDelay] = useState(false);
  const [more, setMore] = useState(true);

  async function init() {
    var array = [];
    var length = 0;

    await ref.get().then(function (doc) {
      setVideo({...doc.data()});
    })

    await ref.collection('singer').get().then(function (snapshot) {
      snapshot.forEach(function (singer) {
        array.push({
          ...singer.data(),
          id: singer.id
        })
        length = singer.data().commentsCount;
      })
      setSinger(array);
    })

    await ref.collection('comments').orderBy('createdAt', 'desc').limit(10)
      .get().then(function(snapshot) {
        array = [];
        snapshot.forEach(function (data) {
          array.push({
            ...data.data(),
            id: data.id
          })
        })
        setComments(array);
      })

    if(array.length === length) setMore(false);

    setLoaded(true);
    setTimeout(() => setValue(value + 1), 1500);
    setTimeout(() => upViews(), 60000);
  }

  async function getLiked() {
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
    if(myComment === '') return;
  
    if(delay) {
      alert('3초 이내 작성/삭제 가 불가능합니다.'); return;
    } else {
      setDelay(true); setTimeout(() => setDelay(false), 3000);
    }

    const commentID = uuid()
    const comment = {
      uid: props.user.uid,
      name: props.user.nickname,
      image: props.user.photoURL,
      content: myComment, 
      createdAt: Date.now()
    };

    setComments([{
      id: commentID, ...comment
    }, ...comments]);
    setMyComment('');

    await ref.get().then(function (doc) {
      var commentsCount = doc.data().commentsCount;
      var v = video;

      if(commentsCount === undefined) 
        commentsCount = 1;
      else
        commentsCount++;

      v.commentsCount = commentsCount;
      setVideo(v);
      ref.update({ commentsCount })
    })
    await ref.collection('comments').doc(commentID).set({...comment});
  }

  async function onDeleteComment(id) {
    if(delay) {
      alert('3초 이내 작성/삭제 가 불가능합니다.'); return;
    } else {
      setDelay(true); setTimeout(() => setDelay(false), 3000);
    }
    
    var flag = true;
    var array = [];

    for(var i=0; i<comments.length; i++) {
      if(id !== comments[i].id) {
        array.push(comments[i]);
      } else {
        flag = false;
      }
    }

    if(flag) return;
    setComments(array);

    await ref.get().then(function (doc) {
      if(!doc.exists) return;

      var commentsCount = doc.data().commentsCount - 1;
      var v = video; v.commentsCount = commentsCount;

      ref.update({ commentsCount })
      setVideo(v);
    })
    await ref.collection('comments').doc(id).delete();

    setComments(array);    
  }

  async function getMoreComments() {
    if(delay) {
      alert('3초 이내 재작동이 불가능합니다.'); return;
    } else {
      setDelay(true); setTimeout(() => setDelay(false), 3000);
    }

    var array = comments.slice();
    
    await ref.collection('comments').orderBy('createdAt', 'desc')
            .startAfter(comments[comments.length-1].createdAt).limit(10)
            .get().then(function (snapshot) {
              snapshot.forEach(function (data) {
                array.push({
                  ...data.data(),
                  id: data.id
                })
              })

              if(array.length === video.commentsCount) setMore(false);
              setComments(array);
            })
    
  }

  return (
    <Container key='video'>
      {loaded ? <>
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
            setVideo={setVideo}
          />
        </Box>

        <Box flex='0.4'>
          <div>
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

          <div style={{marginBottom:'10px'}}>댓글 {video.commentsCount}개</div>
          <div style={{height:'60vh', overflowY:'scroll'}}>
            {comments.length === 0 ? <>댓글이 없습니다.</> : <>
              {comments.map((comment) => 
                <Comment key={comment.id} 
                        user={props.user} 
                        comment={comment}
                        onDeleteComment={onDeleteComment}
                        />
              )}
              {more &&
                <MoreCommentsButton onClick={() => getMoreComments()}>더 보기</MoreCommentsButton>
              }
            </>}
          </div>
        </Box>
      </> : <><Loading /></>}
    </Container>
  )
}

export default Video

const Container = styled.div`
  flex: 1;
  display: flex;
  height: 100%;
  background-color: #f9f9f9;
  padding: 0 10px;
`
const Box = styled.div`
  flex: ${(props) => props.flex || 1};
  padding: 10px;
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
  padding: 0;
  margin: 0;
`
const Button = styled.button`
  width: 100%;
  height: 100px;
  padding: 0;
  margin: 0;
`
const MoreCommentsButton = styled.button`
  width: 100%;
  height: 50px;
  margin-top: 10px;
`