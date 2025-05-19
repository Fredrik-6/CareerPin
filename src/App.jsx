// CareerPin Basic Starter App with Routing
// This adds simple navigation between Home and Profile pages and displays the saved input with improved layout

// Import React and routing tools
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

// Main App component
function App() {
  return (
    // Set up Router for navigation
    <Router>
      <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>

        {/* Navigation bar with links */}
        <nav style={{ marginBottom: '2rem' }}>
          <Link to="/" style={{ marginRight: '1rem', fontWeight: 'bold' }}>Home</Link>
          <Link to="/profile" style={{ fontWeight: 'bold' }}>Profile</Link>
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
  const [goal, setGoal] = useState("");
  const [name, setName] = useState("");
  const [skills, setSkills] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const savedGoal = localStorage.getItem("careerGoal");
    const savedName = localStorage.getItem("userName");
    const savedSkills = localStorage.getItem("userSkills");
    if (savedGoal || savedName || savedSkills) {
      if (savedGoal) setGoal(savedGoal);
      if (savedName) setName(savedName);
      if (savedSkills) setSkills(savedSkills);
      setMessage(`Welcome ${savedName || "User"}, your current goal is: ${savedGoal || "(none set yet)"}`);
    }
  }, []);

  const handleGoalChange = (e) => setGoal(e.target.value);
  const handleNameChange = (e) => setName(e.target.value);
  const handleSkillsChange = (e) => setSkills(e.target.value);

  const handleClick = () => {
    localStorage.setItem("careerGoal", goal);
    localStorage.setItem("userName", name);
    localStorage.setItem("userSkills", skills);
    setMessage(`Welcome ${name}, your career goal is saved: ${goal}`);
  };

  return (
    <div>
      <h1>Profile Page</h1>
      <p>Fill in your information to personalize your career journey.</p>

      <div style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '8px', maxWidth: '400px' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem' }}>Name</label>
        <input
          type="text"
          value={name}
          onChange={handleNameChange}
          placeholder="Enter your name"
          style={{ padding: '0.5rem', width: '100%', marginBottom: '1rem' }}
        />

        <label style={{ display: 'block', marginBottom: '0.5rem' }}>Career Goal</label>
        <input
          type="text"
          value={goal}
          onChange={handleGoalChange}
          placeholder="Enter your career goal"
          style={{ padding: '0.5rem', width: '100%', marginBottom: '1rem' }}
        />

        <label style={{ display: 'block', marginBottom: '0.5rem' }}>Skills</label>
        <input
          type="text"
          value={skills}
          onChange={handleSkillsChange}
          placeholder="Enter your skills (e.g. Excel, Python)"
          style={{ padding: '0.5rem', width: '100%', marginBottom: '1rem' }}
        />

        <button onClick={handleClick} style={{ padding: '0.5rem 1rem', fontWeight: 'bold' }}>
          Submit
        </button>
      </div>

      {message && <p style={{ marginTop: '1.5rem', fontWeight: 'bold' }}>{message}</p>}
    </div>
  );
}

// Export the App so it can be run
export default App;
