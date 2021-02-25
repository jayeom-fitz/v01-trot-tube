import React from 'react'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from '../routes/Home'
import Login from '../routes/Login'
import Admin from '../routes/Admin'

function AppRouter(props) {
  return (
    <Router>
      <Switch>
        <Route exact path="/" ><Home user={props.user} /></Route>
        
        <Route path="/login" component={Login}/>
        
        <Route 
          path="/user/:uid"
          render={() => <Home user={props.user} pageName='user'/>}/>

        <Route 
          path="/tv/:tpid"
          render={() => <Home user={props.user} pageName='tv-program'/>}/>

        <Route exact path="/admin/" ><Admin user={props.user} /></Route>
        <Route path="/admin/:startComponent" ><Admin user={props.user} /></Route>
      </Switch>
    </Router>
  )
}

export default AppRouter
