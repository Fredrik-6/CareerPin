// CareerPin Basic Starter App with Routing
// This adds simple navigation between Home and Profile pages

// Import React and routing tools
import React, { useState } from "react";
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
  // React state to track input value
  const [goal, setGoal] = useState("");

  // Handle input change
  const handleChange = (e) => {
    setGoal(e.target.value);
  };

  // Handle button click
  const handleClick = () => {
    alert(`Your career goal is: ${goal}`);
  };

  return (
    <div>
      <h1>Profile Page</h1>
      <p>This is where users will eventually enter their career information.</p>

      {/* Text input field */}
      <input
        type="text"
        value={goal}
        onChange={handleChange}
        placeholder="Enter your career goal"
        style={{ padding: '0.5rem', width: '100%', maxWidth: '300px', marginBottom: '1rem' }}
      />

      {/* Add a basic button */}
      <br />
      <button onClick={handleClick} style={{ padding: '0.5rem 1rem' }}>
        Submit Goal
      </button>
    </div>
  );
}

// Export the App so it can be run
export default App;
