import React from 'react'
import { useState,useEffect } from 'react'
import {Link} from 'react-router-dom'
import Video from '../assets/landVideo.mp4'
function LandingPage() {


  const text1 = "Uncover the Hidden Stories of Any Location with GeoChronicle AI";
  const text2 = "Explore comprehensive historical insights and significant events of any location through the power of AI.";
  const [displayText, setDisplayText] = useState('');
  const [currentText, setCurrentText] = useState(text1);
  const [charIndex, setCharIndex] = useState(0);
  useEffect(() => {
    if (charIndex < currentText.length) {
      const timeoutId = setTimeout(() => {
        setDisplayText((prev) => prev + currentText[charIndex]);
        setCharIndex((prev) => prev + 1);
      }, 100); // Delay between letters
      return () => clearTimeout(timeoutId);
    } else if (currentText === text1) {
      setTimeout(() => {
        setDisplayText(''); // Clear the text
        setCurrentText(text2); // Switch to the second text
        setCharIndex(0); // Reset index for new text
      }, 2000); // Delay before starting the second text
    }
  }, [charIndex, currentText]);

  return (
    <div>
        <video autoPlay muted loop src={Video}></video>
        <div className="centered-text">
        <p className='landpage-para'>GeoChronicle</p>
        </div>
        <div style={{width:"470px",marginRight:"6.3rem"}} className="centered-text mt-5">
            <p style={{fontSize:"1.2rem"}} className='animated text-center'>{displayText}</p>
            <Link style={{textDecoration:"none"}} className='d-flex justify-content-center' to='/home'>
            <button className="btn btn-outline-info p-2">
            Get Started <span className='mt-5'>{'>>'}</span> 
        </button></Link>
        </div>
    </div>
  )
}

export default LandingPage