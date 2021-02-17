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
          path="/admin/:startComponent" 
          render={() => <Admin user={props.user} />}/>
      </Switch>
    </Router>
  )
}

export default AppRouter
