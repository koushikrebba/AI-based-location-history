import React from 'react';
import './Display.css';
import YouTubeSearch from './YouTubeSearch';
import Navbar from './Navbar';
import Footer from './Footer'
function Display() {
  return (
    <div className="display-app-container">
      <Navbar/>
      <header className="display-app-header mt-5">
        <h1>Know more about the locations</h1>
      </header>
      <main className="display-app-main">
        <YouTubeSearch />
      </main>
      <Footer/>
      
    </div>
  );
}

export default Display;