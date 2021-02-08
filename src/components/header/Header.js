import React, { useState } from 'react'
import './Header.css'

import { Link } from 'react-router-dom';

import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import VideoCallIcon from "@material-ui/icons/VideoCall";
import AppsIcon from "@material-ui/icons/Apps";
import NotificationsIcon from "@material-ui/icons/Notifications";

import UserIcon from './UserIcon';


function Header(props) {
  const [inputSearch, setInputSearch] = useState('');

  return (
    <div className="header">
      <div className="header__left">
        <MenuIcon />
        <Link to="/">
          <img 
            className="header__logo"
            src="/images/logo-trottube.png" 
            alt="" 
          />
        </Link>
      </div>

      <div className="header__input">
        <input 
          type="text" 
          placeholder="Search" 
          value={inputSearch}
          onChange={e => setInputSearch(e.target.value)}
        />
        <Link to={inputSearch && `/search/${inputSearch}`} className="header__inputButtonLink">
          <SearchIcon className="header__inputButton"/>
        </Link>
      </div>

      <div className="header__icons">
        <VideoCallIcon className="header__icon"/>
        <AppsIcon className="header__icon"/>
        <NotificationsIcon className="header__icon"/>
        
        <UserIcon user={props.user}/>
      </div>
    </div>
  )
}

export default Header
