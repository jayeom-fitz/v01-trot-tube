import React from 'react';
import './App.css';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Header from './components/header/Header';
import Sidebar from './components/sidebar/Sidebar';

import RecommendedVideos from './components/home/RecommendedVideos';
import SearchVideos from './components/search/SearchVideos';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />

        <div className="app__page">
          <Sidebar />

          <Switch>
            <Route path="/search/:searchContent">
              <SearchVideos />
            </Route>

            <Route path="/">
              <RecommendedVideos />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
