import React from 'react'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from '../routes/Home'
import Login from '../routes/Login'

function AppRouter({ user }) {
  return (
    <Router>
      <Switch>
        <Route exact path="/" ><Home user={user} /></Route>
        
        <Route path="/login" component={Login}/>
        
        <Route path="/user/:uid" ><Home user={user} pageName='user' /></Route>
      </Switch>
    </Router>
  )
}

export default AppRouter
