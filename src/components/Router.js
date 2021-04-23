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
          path="/hot"
          render={() => <Home user={props.user} pageName='hot'/>}/>

        <Route 
          path="/like"
          render={() => <Home user={props.user} pageName='like'/>}/>

        <Route 
          path="/guestbook"
          render={() => <Home user={props.user} pageName='guestbook'/>}/>

        <Route 
          path="/user/:uid"
          render={() => <Home user={props.user} pageName='user'/>}/>

        <Route 
          path="/tv/:tpid"
          render={() => <Home user={props.user} pageName='tv-program'/>}/>

        <Route 
          path="/video/:vid"
          render={() => <Home user={props.user} pageName='video'/>}/>

        <Route 
          path="/search/:searchContent"
          render={() => <Home user={props.user} pageName='search'/>}/>
       
        <Route exact path="/admin/" ><Admin user={props.user} /></Route>
        <Route path="/admin/:startComponent/:id" ><Admin user={props.user} /></Route>
        <Route path="/admin/:startComponent" ><Admin user={props.user} /></Route>
      </Switch>
    </Router>
  )
}

export default AppRouter
