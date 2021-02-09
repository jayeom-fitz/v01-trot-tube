import React from 'react'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from '../routes/Home'
import Auth from '../routes/Auth'
import User from '../routes/User';

function AppRouter({ user }) {
  return (
    <Router>
      <Switch>
        <Route exact path="/" ><Home user={user} /></Route>
        
        <Route path="/login" component={Auth}/>

        <Route path="/user/:uid" ><User user={user} /></Route>
      </Switch>
    </Router>
  )
}

export default AppRouter
