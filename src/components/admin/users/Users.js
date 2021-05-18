import React, { useState, useEffect } from 'react'
import { useParams, Link } from "react-router-dom";

import styled, { css } from 'styled-components'

import { storeService } from "src/fbase"

import Avatar from "@material-ui/core/Avatar";

import Loading from 'src/components/effect/Loading';
import { dateToString } from 'src/func';

function Users() {
  const { startComponent } = useParams();

  const [loaded, setLoaded] = useState(false);
  const [title, setTitle] = useState('');
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');

  async function getUsers() {
    var array = []; var verified;

    switch(startComponent) {
      case 'administrators': 
        verified = 2; setTitle('관리자'); break;
      case 'users' : 
        verified = 0; setTitle('회원'); break;
      default : 
        verified = -1; setTitle('금지 회원'); break;
    }

    await storeService.collection('users').where('verified', '==', verified)
      .get().then(function (snapshot) {
        snapshot.forEach(function (doc) {
          array.push({
            id : doc.id,
            ...doc.data(),
            active : true
          })
        })
      })
    
    setUsers(array); setLoaded(true);
  }

  useEffect(() => {
    getUsers();
  }, [startComponent])

  const onChange = (e) => {
    const value = e.target.value; setSearch(value);
 
    if(users.length === 0) return;
    var array = users.slice();
    for(var i=0; i<array.length; i++) {
      array[i].active = array[i].nickname.includes(value);      
    }
    setUsers(array);
  }

  return (
    <div style={{width:'100%'}}>
      {loaded ? <>
        <Container>
          <Title>{title} 관리</Title>
          
          <div>
            <Input value={search} placeholder='이름 검색' onChange={onChange}/>
            
            <div style={{paddingTop:'20px'}}>
              <Line top='true'>
                <Column flex='0.2'>이미지</Column>
                <Column flex='0.3'>아이디</Column>
                <Column flex='0.2'>닉네임</Column>
                <Column flex='0.3'>가입일</Column>
              </Line>
              {users.length != 0 ? users.map((user) => user.active && 
                <StyledLink key={user.id} to={`/admin/user/${user.id}`}>
                  <Line>
                    <Column flex='0.2'>
                      <StyledAvatar src={user.photoURL}/>
                    </Column>
                    <Column flex='0.3'>{user.id}</Column>
                    <Column flex='0.2'>{user.nickname}</Column>
                    <Column flex='0.3'>{dateToString(user.joinDate)}</Column>
                  </Line>
                </StyledLink>
              ) : <Line>{title}이(가) 없습니다</Line>}

            </div>
          </div>
        </Container>
      </> : <Loading />}
    </div>
  )
}

export default Users

const Container = styled.div`
  padding: 40px;
`
const Title = styled.h1`
  margin: 0;
`
const Input = styled.input`
  padding: 10px;
  margin-top: 20px;
  border: none;
  border-bottom: 1px solid lightgrey;

  &:focus {
    outline: 2px solid #3CAEA3
  }
`
const Line = styled.div`
  width: 100%;
  display: flex;
  padding: 10px;
  transition-duration: 0.2s;
  border-bottom: 1px solid lightgrey;
  align-items: center;
  
  ${(props) => {
    if(props.top) {
      return css`
        color: white;
        background-color: black;
      `;
    } else {
      return css`
        &:hover {
          background-color: lightgrey;
        }
      `;
    }
  }}
`
const Column = styled.div`
  flex: ${(props) => props.flex || '0.1'};
  text-align: center;
`
const StyledAvatar = styled(Avatar)`
  width: 50px !important;
  height: 50px !important;
  margin: auto;
  border: 1px solid lightgrey;
`
const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
`