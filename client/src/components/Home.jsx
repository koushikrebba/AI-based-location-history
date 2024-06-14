import React from 'react';
import './Home.css'

const Home = () => {
  return (
    <div className="homepage">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>AI-Powered Location Insights</h1>
          <p>Explore your location history with advanced AI analytics.</p>
          <a href="#features" className="btn">Discover More</a>
        </div>
      </section>

      {/* Features Section */}
      <section className="features bg-info" id="features">
        <div className="container">
          <h2>Features</h2>
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
      <section className="about" id="about">
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
  );
};

export default Home;
