import React, { useEffect, useState } from 'react'

import { useParams } from "react-router-dom";
import styled from 'styled-components';

import { storeService } from 'src/fbase'

import Avatar from "@material-ui/core/Avatar";
import { FcApprove } from 'react-icons/fc'
import { GoGear } from 'react-icons/go'

import UserEdit from './UserEdit';
import Loading from 'src/components/effect/Loading';

function UserInfo(props) {
  const { uid } = useParams();
  
  const [loaded, setLoaded] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    async function getUserInfo() {
      await storeService.collection('users').doc(uid).get().then(function(doc) {
        setUserInfo(doc.data());
        setLoaded(true);
      });
    }
    getUserInfo();
  }, [uid])

  function changeDateFormat(str) {
    const date = str.split(" ");
    let ret = date[3];
    const month = date[1];

    switch(month) {
      case 'Jan' : ret += '-01-'; break;
      case 'Feb' : ret += '-02-'; break;
      case 'Mar' : ret += '-03-'; break;
      case 'Apr' : ret += '-04-'; break;
      case 'May' : ret += '-05-'; break;
      case 'Jun' : ret += '-06-'; break;
      case 'Jul' : ret += '-07-'; break;
      case 'Aug' : ret += '-08-'; break;
      case 'Sep' : ret += '-09-'; break;
      case 'Oct' : ret += '-10-'; break;
      case 'Nov' : ret += '-11-'; break;
      case 'Dec' : ret += '-12-'; break;
      default : ret += '-XX-'; break;
    }
    return ret + date[2];
  }

  function toggleUserEdit() {
    setEdit(!edit);
  }

  return (
    <>
      {loaded ? (
        <>
        {userInfo ? (
          <Container>
            <UserRow>
              <UserAvatar 
                src={userInfo.photoURL}
                alt=""
              />
              <Content>
                <UserName>
                  {userInfo.nickname} 
                  {userInfo.verified === 1 ? <FcApprove size='24'/> : null}
                  {props.user && userInfo.uid === props.uid ? 
                    <GoGear 
                      onClick={toggleUserEdit}
                      size='18' style={{cursor:'pointer'}} /> : null}
                </UserName> 
                <JoinDate>가입일 : {changeDateFormat(Date(userInfo.joinDate).toString())}</JoinDate>
              </Content>
            </UserRow>
            {edit ? <UserEdit user={props.user} toggleUserEdit={toggleUserEdit} /> : null}
          </Container>
        ) : null}
        </>
      ) : <><Loading /></>}
    </>
  )
}

export default UserInfo

const Container = styled.div`
  flex: 1;
  background-color: #f9f9f9;
  padding: 0px 10px;
  padding-bottom: 0;
`
const UserRow = styled.div`
  display: flex;
  align-items: center;
  width: 70%; 
  margin: auto;
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