import React from 'react';
import './App.css';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './routes/Home'

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/search">
            <h1>Search</h1>
          </Route>

          <Route path="/" component={Home} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
