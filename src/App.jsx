// CareerPin Basic Starter App with Routing
// This adds simple navigation between Home and Profile pages

// Import React and routing tools
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

// Main App component
function App() {
  return (
    // Set up Router for navigation
    <Router>
      <div style={{ padding: '2rem' }}>

        {/* Navigation bar with links */}
        <nav style={{ marginBottom: '1rem' }}>
          <Link to="/" style={{ marginRight: '1rem' }}>Home</Link>
          <Link to="/profile">Profile</Link>
        </nav>

        {/* Route definitions */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </Router>
  );
}

// Home page component
function Home() {
  return (
    <div>
      <h1>CareerPin</h1>
      <p>Welcome to the beginning of your career journey.</p>
    </div>
  );
}

// Profile page component
function Profile() {
  return (
    <div>
      <h1>Profile Page</h1>
      <p>This is where users will eventually enter their career information.</p>
    </div>
  );
}

// Export the App so it can be run
export default App;
