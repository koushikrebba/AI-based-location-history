import React from 'react';
import './Home.css'
import Navbar from './Navbar';

const Home = () => {
  return (
    <div>
        <Navbar/>
        <div className="homepage">
      {/* Hero Section */}
      <Navbar></Navbar>
      <div className="">
      <section style={{background:" background: linear-gradient(to bottom, #1a237e, #0288d1, #009688, #4caf50, #8bc34a, #cddc39, #ffeb3b, #ffc107, #ff9800, #ff5722, #e64a19, #bf360c);"}} className="hero">
        <div className="hero-content">
          <h1>AI-Powered Location Insights</h1>
          <p>Explore your location history with advanced AI analytics.</p>
          <a href="#features" className="btn btn-outline-warning">Discover More</a>
        </div>
      </section>
      </div>

      {/* Features Section */}
      <section className="features" id="features">
        <div className="container">
          <h2 className='text-white'>Features</h2>
          <div className="feature-cards">
            <div className="feature-card">
              <i className="fas fa-map-marked-alt"></i>
              <h3>Interactive Maps</h3>
              <p>Visualize your location history on interactive maps.</p>
            </div>
            <div className="feature-card">
              <i className="fas fa-brain"></i>
              <h3>AI Insights</h3>
              <p>Gain insights into your travel patterns and habits.</p>
            </div>
            <div className="feature-card">
              <i className="fas fa-lock"></i>
              <h3>Privacy First</h3>
              <p>Your data is secure and private with advanced encryption.</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about text-white" id="about">
        <div className="container">
          <h2>About Us</h2>
          <p>We are dedicated to transforming your location data into actionable insights using cutting-edge AI algorithms.</p>
          <p>Our mission is to empower individuals and businesses with valuable location intelligence.</p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact" id="contact">
        <div className="container">
          <h2>Contact Us</h2>
          <p>If you have any questions or inquiries, feel free to reach out to us.</p>
          <p>Email: contact@locationai.com</p>
          <p>Phone: +123-456-7890</p>
        </div>
      </section>
    </div>
    </div>
    
  );
};

export default Home;
