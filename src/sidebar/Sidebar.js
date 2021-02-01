import React from 'react'
import './Sidebar.css'

import SidebarRow from './SidebarRow';

import HomeIcon from "@material-ui/icons/Home";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import SubscriptionsIcon from "@material-ui/icons/Subscriptions";
import VideoLibraryIcon from "@material-ui/icons/VideoLibrary";
import OndemandVideoIcon from "@material-ui/icons/OndemandVideo";
import WatchLaterIcon from "@material-ui/icons/WatchLater";
import ThumbUpAltOutlinedIcon from "@material-ui/icons/ThumbUpAltOutlined";

function Sidebar() {
  return (
    <div className="sidebar">
      <SidebarRow selected Icon={HomeIcon} title="홈"/>
      <SidebarRow Icon={WhatshotIcon} title="인기"/>
      <SidebarRow Icon={SubscriptionsIcon} title="구독"/>

      <hr />

      <SidebarRow Icon={VideoLibraryIcon} title="보관함"/>
      <SidebarRow Icon={OndemandVideoIcon} title="내 재생 목록"/>
      <SidebarRow Icon={WatchLaterIcon} title="나중에"/>
      <SidebarRow Icon={ThumbUpAltOutlinedIcon} title="좋아요"/>
          
    </div>
  )
}

export default Sidebar
