import React from 'react';
import './App.css';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Header from './components/header/Header';
import Sidebar from './components/sidebar/Sidebar';

import RecommendedVideos from './components/videos/RecommendedVideos';
import SearchVideos from './components/videos/SearchVideos';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />

        <div className="app__page">
          <Sidebar />

          <Switch>
            <Route path="/search/:searchTerm">
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
