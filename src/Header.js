import React from 'react'

import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import VideoCallIcon from "@material-ui/icons/VideoCall";
import AppsIcon from "@material-ui/icons/Apps";
import NotificationsIcon from "@material-ui/icons/Notifications";

import Avatar from "@material-ui/core/Avatar";


function Header() {
  return (
    <div className="header">
      <h1>I'm Header</h1>
      <MenuIcon />
      <img 
        className="header__logo"
        src="/images/logo-trottube.png" 
        alt="" 
      />
      <input type="text" />
      <SearchIcon />
      <VideoCallIcon />
      <AppsIcon />
      <NotificationsIcon />
      
      <Avatar 
        className=""
        src="https://d3nfwcxd527z59.cloudfront.net/content/uploads/2020/11/13093616/Bruno-Fernandes-Manchester-United-9.jpg"
        alt=""
      />
    </div>
  )
}

export default Header
