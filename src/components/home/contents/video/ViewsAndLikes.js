import React from 'react'
import { useParams, Link } from "react-router-dom";

import styled from "styled-components";

import { storeService } from "src/fbase";
import { dateToString } from "src/func"

import { MdThumbUp } from 'react-icons/md'

function ViewsAndLikes(props) {
  const { vid } = useParams();

  function viewsToString(views) {
    views = parseInt(views);
    var v = views % 1000; views = parseInt(views/1000);
    for(;views !== 0; views = parseInt(views/1000)) {
      v = views % 1000 + ',' + v;
    }
    return '조회수 : ' + v + '회';
  }

  const onThumbUpClick = async () => {
    if(!props.user) alert('로그인이 필요합니다.');
    const ref = storeService.collection('videos').doc(vid);

    await ref.get().then(async function (doc) {
      var likes = doc.data().likes;

      if(props.isLiked) {
        likes--;
        await ref.collection('liked').doc(props.user.uid).delete();
        await storeService.collection('users').doc(props.user.uid)
                        .collection('likedVideos').doc(vid).delete();
      } else {
        likes++;
        await ref.collection('liked').doc(props.user.uid).set({
          clicked: Date.now()
        })
        await storeService.collection('users').doc(props.user.uid)
                        .collection('likedVideos').doc(vid).set({
                          liked: Date.now()
                        });
      }
  
      await ref.update({ likes });
    })

    props.setIsLiked(!props.isLiked);
  }
  
  return (
    <>
      <Title>
        {props.video.views ? viewsToString(props.video.views) : viewsToString(0)
        } • {
        dateToString(props.video.createdAt)
        } • 좋아요 : {props.video.likes}
        {props.user && 
          <ThumbUp 
            size='18' color={props.isLiked ? 'blue' : 'grey'}
            onClick={onThumbUpClick}
          />
        }
      </Title>
      
      <Title>
        가수 : {props.singer.map((s) => 
          <Link to={`/person/${s.id}`} key={s.id}
                style={{textDecoration:'none', color:'grey'}}> {s.name} </Link>
        )}
      </Title>
    </>
  )
}

export default ViewsAndLikes

const Title = styled.h4`
  padding-left: 10px;
  margin: 0;
  color: grey;
  font-weight: 300;
`
const ThumbUp = styled(MdThumbUp)`
  padding-left: 20px;
  cursor: pointer;
`