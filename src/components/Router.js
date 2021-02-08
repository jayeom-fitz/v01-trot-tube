import React, { useState } from 'react'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from '../routes/Home'
import Auth from '../routes/Auth'

function AppRouter({ user }) {
  return (
    <Router>
      <Switch>
        <Route exact path="/" >
          <Home user={user} />
        </Route>
        
        <Route path="/login" component={Auth}/>
      </Switch>
    </Router>
  )
}

export default AppRouter
