import React, { useEffect, useState } from 'react'

import { useParams } from "react-router-dom";
import styled from 'styled-components';

import { storeService } from '../../../fbase'

import Avatar from "@material-ui/core/Avatar";
import { FcApprove } from 'react-icons/fc'

function UserInfo(props) {
  const { uid } = useParams();
  
  const [loaded, setLoaded] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  
  useEffect(() => {
    async function getUserInfo() {
      await storeService.collection('users').doc(uid).get().then(function(doc) {
        setUserInfo(doc.data());
        setLoaded(true);
      });
    }
    getUserInfo();
  }, [uid])

  return (
    <>
      {loaded ? (
        <Container>
          <UserRow>

            <UserAvatar 
              src={userInfo.photoURL}
              alt=""
            />
            <Content>
              <UserName>
                {userInfo.nickname} 
                {userInfo.verified ? <FcApprove size='24'/> : null}
              </UserName> 
              <JoinDate>{Date(userInfo.joinDate)}</JoinDate>
            </Content>
          </UserRow>
        </Container>
      ) : null}
    </>
    
  )
}

export default UserInfo

const Container = styled.div`
  flex: 0.8;
  background-color: #f9f9f9;
  padding: 0px 10px;
  padding-bottom: 0;
`
const UserRow = styled.div`
  display: flex;
  align-items: center;
  width: 70%; 
`
const UserAvatar = styled(Avatar)`
  height: 120px !important;
  width: 120px !important;
  margin: 10px 60px;
  border: 1px solid grey;
`
const Content = styled.div`
  display: flex;
  flex-direction: column;
`
const UserName = styled.h4`
  display: flex;
  align-items: center;
  justify-content: space-between;  
`
const JoinDate = styled.p`
  color: #606060;
  font-size: small !important;
`