import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";

import styled, { css } from 'styled-components'

import { storeService } from "src/fbase"

import Avatar from "@material-ui/core/Avatar";

import Loading from 'src/components/effect/Loading';
import { dateToString } from 'src/func';

function User() {
  const { id } = useParams();

  const [loaded, setLoaded] = useState(false);
  const [nickname, setNickname] = useState('');
  const [photoURL, setPhotoURL] = useState('');
  const [verified, setVerified] = useState(0);
  const [joinDate, setJoinDate] = useState(0);
  const [banReason, setBanReason] = useState('');
  const [banDate, setBanDate] = useState(0);
  
  async function getUserData() {
    await storeService.collection('users').doc(id)
      .get().then(function (doc) {
        setNickname(doc.data().nickname);
        setPhotoURL(doc.data().photoURL);
        setVerified(doc.data().verified);
        setJoinDate(doc.data().joinDate);

        if(doc.data().banReason !== undefined) setBanReason(doc.data().banReason);
        if(doc.data().banDate !== undefined) setBanDate(doc.data().banDate);
      })

    setLoaded(true);
  }

  useEffect(() => {
    getUserData();
  }, [id])

  const onSubmit = async () => {
    var ban = 0;
    
    if(verified === -1 && banDate === 0) ban = Date.now();

    await storeService.collection('users').doc(id).update({
      nickname, photoURL, verified, banReason, banDate : ban
    });
    
    setBanDate(ban);
    alert('수정되었습니다.')
  }

  return (
    <div style={{width:'100%'}}>
    {loaded ? <Container>
      <Title>유저 관리</Title>

      <BoxContainer>
        <Box flex='0.3'>
          <StyledAvatar src={photoURL} alt="" />
        </Box>

        <Box flex='0.7'>
          <InputBox>
            <Text>가입일</Text>
            <Box flex='0.8'>
              <Text>{dateToString(joinDate)}</Text>
            </Box>
          </InputBox>

          <InputBox>
            <Text>닉네임</Text>
            <Input value={nickname} onChange={(v) => setNickname(v.target.value)}/>
          </InputBox>

          <InputBox>
            <Text>이미지</Text>
            <Input value={photoURL} onChange={(v) => setPhotoURL(v.target.value)}/>
          </InputBox>

          <InputBox>
            <Text>등급</Text>
            <Box flex='0.8' style={{display:'flex'}}>
              <Label><input type="radio" id="verified" value="0" checked={verified === 0}
                        onChange={(e) => setVerified(parseInt(e.target.value))}
              /> 일반</Label>
              {/* <Label><input type="radio" id="verified" value="1" checked={verified === 1}          
                        onChange={(e) => setVerified(parseInt(e.target.value))}
              /> 인증</Label> */}
              <Label><input type="radio" id="verified" value="2" checked={verified === 2}
                        onChange={(e) => setVerified(parseInt(e.target.value))}
              /> 관리자</Label>
              <Label><input type="radio" id="verified" value="-1" checked={verified === -1}
                        onChange={(e) => setVerified(parseInt(e.target.value))}
              /> 정지</Label>
            </Box>
          </InputBox>

          {verified === -1 && <>
            <InputBox>
              <Text>정지사유</Text>
              <Input value={banReason} onChange={(v) => setBanReason(v.target.value)}/>
            </InputBox>
          </>}
          {banDate > 0 && <>
            <InputBox>
              <Text>정지일자</Text>
              <Box flex='0.8'>
                <Text>{dateToString(banDate)}</Text>
              </Box>
            </InputBox>
          </>}

          <InputBox>
            <Button onClick={onSubmit}>수정</Button>
          </InputBox>
        </Box>
      </BoxContainer>
    </Container> : <Loading />}
    </div>
  )
}

export default User

const Container = styled.div`
  padding: 40px;
`
const Title = styled.h1`
  margin: 0;
`
const BoxContainer = styled.div`
  display: flex;
  align-items: center;
  width: 90%;
  margin: auto;
`
const Box = styled.div`
  flex: ${(props) => props.flex};
  text-align: center;
`
const StyledAvatar = styled(Avatar)`
  width: 200px !important;
  height: 200px !important;
  margin: auto;
`
const InputBox = styled.div`
  display: flex;
  align-items: center;
`
const Text = styled.h4`
  flex: 0.2;
  text-align: center;
  
`
const Input = styled.input`
  flex: 0.8;
  height: 30px;
  margin: 10px 0;
  padding-left: 5px;
  border: 1px solid lightgrey;

  &:focus {
    outline: 2px solid #20B2AA;
  }
`
const Label = styled.label`
  flex: 0.2;
`
const Button = styled.button`
  width: 75px;
  height: 50px;
  margin: auto;
  border: none;
  transition-duration: 0.4s;
  background-color: #00C851;

  &:hover {
    color: white;
    background-color: #007E33;
  }
`