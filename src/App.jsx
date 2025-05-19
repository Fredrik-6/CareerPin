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
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  // Load data from localStorage on first render
  useEffect(() => {
    const savedGoal = localStorage.getItem("careerGoal");
    const savedName = localStorage.getItem("userName");
    if (savedGoal || savedName) {
      if (savedGoal) setGoal(savedGoal);
      if (savedName) setName(savedName);
      setMessage(`Welcome ${savedName || "User"}, your current goal is: ${savedGoal || "(none set yet)"}`);
    }
  }, []);

  // Handle input changes
  const handleGoalChange = (e) => setGoal(e.target.value);
  const handleNameChange = (e) => setName(e.target.value);

  // Handle submit
  const handleClick = () => {
    localStorage.setItem("careerGoal", goal);
    localStorage.setItem("userName", name);
    setMessage(`Welcome ${name}, your career goal is saved: ${goal}`);
  };

  return (
    <div>
      <h1>Profile Page</h1>
      <p>This is where users will eventually enter their career information.</p>

      {/* Name input field */}
      <input
        type="text"
        value={name}
        onChange={handleNameChange}
        placeholder="Enter your name"
        style={{ padding: '0.5rem', width: '100%', maxWidth: '300px', marginBottom: '1rem' }}
      />

      {/* Goal input field */}
      <input
        type="text"
        value={goal}
        onChange={handleGoalChange}
        placeholder="Enter your career goal"
        style={{ padding: '0.5rem', width: '100%', maxWidth: '300px', marginBottom: '1rem' }}
      />

      {/* Submit button */}
      <br />
      <button onClick={handleClick} style={{ padding: '0.5rem 1rem' }}>
        Submit
      </button>

      {/* Show saved message below */}
      {message && <p style={{ marginTop: '1rem', fontWeight: 'bold' }}>{message}</p>}
    </div>
  );
}

// Export the App so it can be run
export default App;
