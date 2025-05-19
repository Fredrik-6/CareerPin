// CareerPin Basic Starter App with Routing
// Refactored to use a unified userProfile object for AI processing

import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <Router>
      <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
        <nav style={{ marginBottom: '2rem' }}>
          <Link to="/" style={{ marginRight: '1rem', fontWeight: 'bold' }}>Home</Link>
          <Link to="/profile" style={{ fontWeight: 'bold' }}>Profile</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </Router>
  );
}

function Home() {
  return (
    <div>
      <h1>CareerPin</h1>
      <p>Welcome to the beginning of your career journey.</p>
    </div>
  );
}

function Profile() {
  const [userProfile, setUserProfile] = useState({
    name: "",
    goal: "",
    skills: "",
    interests: "",
    education: "",
    experience: "",
    industries: ""
  });

  const [showMore, setShowMore] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("userProfile");
    if (saved) {
      const parsed = JSON.parse(saved);
      setUserProfile(parsed);
      setMessage(`Welcome ${parsed.name || "User"}, your current goal is: ${parsed.goal || "(none set yet)"}`);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserProfile({ ...userProfile, [name]: value });
  };

  const handleSubmit = () => {
    localStorage.setItem("userProfile", JSON.stringify(userProfile));
    setMessage(`Welcome ${userProfile.name}, your career goal is saved: ${userProfile.goal}`);
  };

  const handleReset = () => {
    localStorage.clear();
    setUserProfile({
      name: "",
      goal: "",
      skills: "",
      interests: "",
      education: "",
      experience: "",
      industries: ""
    });
    setMessage("");
  };

  return (
    <div>
      <h1>Profile Page</h1>
      <p>Fill in your information to personalize your career journey.</p>

      <div style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '8px', maxWidth: '400px' }}>
        <label>Name</label>
        <input type="text" name="name" value={userProfile.name} onChange={handleChange} placeholder="Enter your name" style={{ padding: '0.5rem', width: '100%', marginBottom: '1rem' }} />

        <label>Career Goal</label>
        <input type="text" name="goal" value={userProfile.goal} onChange={handleChange} placeholder="Enter your career goal" style={{ padding: '0.5rem', width: '100%', marginBottom: '1rem' }} />

        <label>Skills</label>
        <input type="text" name="skills" value={userProfile.skills} onChange={handleChange} placeholder="Enter your skills (e.g. Excel, Python)" style={{ padding: '0.5rem', width: '100%', marginBottom: '1rem' }} />

        <label>Interests</label>
        <input type="text" name="interests" value={userProfile.interests} onChange={handleChange} placeholder="Enter your interests (e.g. sports, health)" style={{ padding: '0.5rem', width: '100%', marginBottom: '1rem' }} />

        <div style={{ marginBottom: '1rem' }}>
          <button onClick={() => setShowMore(!showMore)}>
            {showMore ? "Hide extra fields" : "Show more options"}
          </button>
        </div>

        {showMore && (
          <>
            <label>Education Level</label>
            <input type="text" name="education" value={userProfile.education} onChange={handleChange} placeholder="e.g. Bachelor's, A-Levels" style={{ padding: '0.5rem', width: '100%', marginBottom: '1rem' }} />

            <label>Experience Level</label>
            <input type="text" name="experience" value={userProfile.experience} onChange={handleChange} placeholder="e.g. 0–1 years" style={{ padding: '0.5rem', width: '100%', marginBottom: '1rem' }} />

            <label>Preferred Industries</label>
            <input type="text" name="industries" value={userProfile.industries} onChange={handleChange} placeholder="e.g. tech, healthcare" style={{ padding: '0.5rem', width: '100%', marginBottom: '1rem' }} />
          </>
        )}

        <button onClick={handleSubmit} style={{ padding: '0.5rem 1rem', fontWeight: 'bold', marginRight: '1rem' }}>Submit</button>
        <button onClick={handleReset} style={{ padding: '0.5rem 1rem', backgroundColor: '#f44336', color: '#fff', fontWeight: 'bold' }}>Reset</button>
      </div>

      {message && <p style={{ marginTop: '1.5rem', fontWeight: 'bold' }}>{message}</p>}
    </div>
  );
}

export default App;
