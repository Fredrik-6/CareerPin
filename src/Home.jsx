import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div style={{ backgroundColor: '#1e1e1e', color: '#fff', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
      <h1 style={{ fontSize: '4rem', fontWeight: 'bold' }}>
        <span style={{ color: '#61dafb' }}>Path</span>Finder
      </h1>
      <p style={{ fontSize: '1.25rem', marginTop: '1rem', maxWidth: '600px' }}>
        Discover your ideal career path using personalized AI-driven suggestions based on your skills, goals, and interests.
      </p>
      <div style={{ marginTop: '2rem' }}>
        <Link to="/profile" style={{ marginRight: '1.5rem', fontWeight: 'bold', color: '#61dafb', fontSize: '1.1rem' }}>Get Started</Link>
        <Link to="/dashboard" style={{ fontWeight: 'bold', color: '#61dafb', fontSize: '1.1rem' }}>Dashboard</Link>
      </div>
    </div>
  );
}

export default Home;
