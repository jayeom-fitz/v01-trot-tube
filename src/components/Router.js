import React, { useState } from 'react'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from '../routes/Home'
import Auth from '../routes/Auth'

function AppRouter({ isLogin }) {
  return (
    <Router>
      <Switch>
        {isLogin ? (
          <Route exact path="/" component={Home}/>
        ):(
          <Route path="/" component={Auth}/>
        )}
      </Switch>
    </Router>
  )
}

export default AppRouter
