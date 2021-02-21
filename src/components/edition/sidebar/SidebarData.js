import React from 'react'

export const SidebarData = [
  {
    title: '유저',
    path: '#',
    subNav: [
      {
        title: '유저 관리',
        path: '/admin/user'
      }
    ]
  },
  {
    title: 'TV 프로그램',
    path: '#',
    subNav: [
      {
        title: 'TV 프로그램 관리',
        path: '/admin/tv-program'
      },
      {
        title: '홈 슬라이드',
        path: '/admin/tv-program-slider'
      },
    ]
  },
  {
    title: '인물 관리',
    path: '#',
    subNav: [
      {
        title: '인물 정보',
        path: '/admin/person'
      }
    ]
  }
]
