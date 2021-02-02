import React from 'react';
import './App.css';

import Header from './components/header/Header';
import Sidebar from './components/sidebar/Sidebar';
import RecommendedVideos from './components/videos/RecommendedVideos';

function App() {
  return (
    <div className="App">
      <Header />

      <div className="app__page">
        <Sidebar />
        <RecommendedVideos />
      </div>

      <h1>Hello JayEom</h1><h1>Hello JayEom</h1><h1>Hello JayEom</h1>
      <h1>Hello JayEom</h1><h1>Hello JayEom</h1><h1>Hello JayEom</h1>
      <h1>Hello JayEom</h1><h1>Hello JayEom</h1><h1>Hello JayEom</h1>
      <h1>Hello JayEom</h1><h1>Hello JayEom</h1><h1>Hello JayEom</h1>
      <h1>Hello JayEom</h1><h1>Hello JayEom</h1><h1>Hello JayEom</h1>
      <h1>Hello JayEom</h1><h1>Hello JayEom</h1><h1>Hello JayEom</h1>

    </div>
  );
}

export default App;
