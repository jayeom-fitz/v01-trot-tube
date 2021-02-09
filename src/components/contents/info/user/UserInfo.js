import React, { useEffect, useState } from 'react'
import './UserInfo.css'

import { storeService } from '../../../../fbase'

import Avatar from "@material-ui/core/Avatar";
import { FcApprove } from 'react-icons/fc'

function UserInfo(props) {
  const [loaded, setLoaded] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  
  useEffect(() => {
    async function getUserInfo() {
      await storeService.collection('users').doc(props.uid).get().then(function(doc) {
        setUserInfo(doc.data());
        setLoaded(true);
      });
    }
    getUserInfo();
  }, [props.uid])

  return (
    <>
      {loaded ? (
        <div className="userinfo">
          <div className="userinfo__mainRow">

            <Avatar 
              className="userinfo__logo"
              src={userInfo.photoURL}
              alt=""
            />
            <div className="userinfo__text">
              <h4>{userInfo.nickname} <FcApprove size='24'/></h4> 
              <p>{Date(userInfo.joinDate)}</p>
            </div>
          </div>
        </div>
      ) : null}
    </>
    
  )
}

export default UserInfo
