import React from 'react'
import { useParams } from "react-router-dom";

import Header from '../components/header/Header'
import Sidebar from '../components/sidebar/Sidebar'
import UserInfo from '../components/contents/info/user/UserInfo'

function User(props) {
  const { uid } = useParams();

  return (
    <div>
      <Header user={props.user}/>

      <div style={{display: 'flex'}}>
        <Sidebar />
        <UserInfo uid={uid} />
      </div>
    </div>
  )
}

export default User
