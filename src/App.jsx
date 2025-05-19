// CareerPin Basic Starter App with Routing
// This adds simple navigation between Home and Profile pages and displays the saved input

// Import React and routing tools
import React, { useState, useEffect } from "react";
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
  // React state to track input and display message
  const [goal, setGoal] = useState("");
  const [message, setMessage] = useState("");

  // Load goal from localStorage on first render
  useEffect(() => {
    const savedGoal = localStorage.getItem("careerGoal");
    if (savedGoal) {
      setGoal(savedGoal);
      setMessage(`Your current saved goal is: ${savedGoal}`);
    }
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setGoal(e.target.value);
  };

  // Handle button click
  const handleClick = () => {
    localStorage.setItem("careerGoal", goal);
    setMessage(`Your career goal is saved: ${goal}`);
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

      {/* Submit button */}
      <br />
      <button onClick={handleClick} style={{ padding: '0.5rem 1rem' }}>
        Submit Goal
      </button>

      {/* Show saved goal below */}
      {message && <p style={{ marginTop: '1rem', fontWeight: 'bold' }}>{message}</p>}
    </div>
  );
}

// Export the App so it can be run
export default App;