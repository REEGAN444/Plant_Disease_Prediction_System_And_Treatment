import React from 'react';
import { Link } from 'react-router-dom';
import { Sprout, Heart, Shield, Cpu, Database } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <h4>
            <Sprout size={22} color="var(--primary-400)" />
            <span>PlantAI Intelligent Agriculture</span>
          </h4>
          <p>
            An advanced AI-powered plant pathology diagnostic system utilizing pure Java Convolutional Neural Networks (CNN), Spring Boot, and React to deliver instant leaf disease identification and tailored organic & synthetic treatment recommendations.
          </p>
          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem', flexWrap: 'wrap' }}>
            <span className="badge" style={{ background: '#1e293b', color: '#94a3b8' }}>
              <Cpu size={12} /> Java CNN Engine
            </span>
            <span className="badge" style={{ background: '#1e293b', color: '#94a3b8' }}>
              <Database size={12} /> MySQL 8.0
            </span>
            <span className="badge" style={{ background: '#1e293b', color: '#94a3b8' }}>
              <Shield size={12} /> Spring Boot 3
            </span>
          </div>
        </div>

        <div className="footer-col">
          <h5>Navigation</h5>
          <ul>
            <li><Link to="/">Home Overview</Link></li>
            <li><Link to="/upload">Scan Plant Leaf</Link></li>
            <li><Link to="/diseases">Disease Index</Link></li>
            <li><Link to="/products">Agro Products</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h5>Categories</h5>
          <ul>
            <li><Link to="/fertilizers">Fertilizers</Link></li>
            <li><Link to="/medicines">Medicines & Fungicides</Link></li>
            <li><Link to="/products?type=Natural">Natural & Organic</Link></li>
            <li><Link to="/products?type=Artificial">Synthetic & Mineral</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h5>Account</h5>
          <ul>
            <li><Link to="/login">Farmer Login</Link></li>
            <li><Link to="/register">Register New Account</Link></li>
            <li><Link to="/dashboard">Farmer Dashboard</Link></li>
            <li><Link to="/admin">Admin Console</Link></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          AI Plant Disease Prediction and Recommendation System &copy; {new Date().getFullYear()} &bull; Built with pure Java CNN &amp; Spring Boot &bull; Academic Final Year Project
        </p>
      </div>
    </footer>
  );
};

export default Footer;
