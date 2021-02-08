import React from 'react'
import './UserIcon.css'

import { authService } from '../../fbase'

import { Link } from 'react-router-dom';
import Avatar from "@material-ui/core/Avatar";

function UserIcon(props) {
  return (
    <>
      {props.user ? (
        <div className="userIcon">
          <Avatar 
              className="userIcon__avatar"
              src="https://d3nfwcxd527z59.cloudfront.net/content/uploads/2020/11/13093616/Bruno-Fernandes-Manchester-United-9.jpg"
              alt=""
              onClick={() => document.getElementById("userIcon__dropdown").classList.toggle("userIcon__dropdownShow")}
            />
          <div id="userIcon__dropdown" className="userIcon__dropdown">
            <span className="userIcon__content">내 정보</span>
            <span 
              className="userIcon__content"
              onClick={() => {
                authService.signOut();
                window.location.reload();
              }}
            >로그아웃</span>
          </div>
        </div>
      ) : (
        <Link to='/login' style={{textDecoration:'none'}}>
          <div className="login">
            로그인
          </div>
        </Link>
      )}
    
    </>
  )
}

window.onclick = function(event) {
  if (!event.target.matches('.MuiAvatar-img')) {
    var dropdowns = document.getElementsByClassName("userIcon__dropdown");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('userIcon__dropdownShow')) {
        openDropdown.classList.remove('userIcon__dropdownShow');
      }
    }
  }
}

export default UserIcon
