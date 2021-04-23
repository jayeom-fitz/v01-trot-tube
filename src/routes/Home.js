import React from 'react'

import Header from '../components/home/header/Header'
import Sidebar from '../components/home/sidebar/Sidebar'

import UserInfo from '../components/home/contents/user/UserInfo'
import TvProgram from '../components/home/contents/tv-program/TvProgram'
import Video from 'src/components/home/contents/video/Video'
import HomeContents from '../components/home/contents/main/HomeContents'
import Hot from 'src/components/home/contents/hot/Hot'
import Like from 'src/components/home/contents/like/Like'
import GuestBook from 'src/components/home/contents/guestbook/GuestBook'
import Search from 'src/components/home/contents/search/Search'

function Home(props) {
  const switchPage = (prop) => {
    switch(prop) {
      case 'user' : return <UserInfo user={props.user} />
      case 'tv-program' : return <TvProgram user={props.user} />
      case 'video' : return <Video user={props.user} />
      case 'hot' : return <Hot />
      case 'like' : return <Like user={props.user} />
      case 'guestbook' : return <GuestBook user={props.user} />
      case 'search' : return <Search />
      default : return <HomeContents user={props.user} />
    }
  }

  return (
    <div>
      <Header user={props.user} />

      <div style={{display: 'flex'}}>
        <Sidebar />
        {switchPage(props.pageName)}
      </div>
    </div>
  )
}

export default Home
