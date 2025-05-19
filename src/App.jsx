// CareerPin Basic Starter App with Routing
// Now includes optional expanded fields for education, experience, and industry

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
  const [goal, setGoal] = useState("");
  const [name, setName] = useState("");
  const [skills, setSkills] = useState("");
  const [interests, setInterests] = useState("");
  const [message, setMessage] = useState("");
  const [showMore, setShowMore] = useState(false);
  const [education, setEducation] = useState("");
  const [experience, setExperience] = useState("");
  const [industries, setIndustries] = useState("");

  useEffect(() => {
    const savedGoal = localStorage.getItem("careerGoal");
    const savedName = localStorage.getItem("userName");
    const savedSkills = localStorage.getItem("userSkills");
    const savedInterests = localStorage.getItem("userInterests");
    const savedEducation = localStorage.getItem("userEducation");
    const savedExperience = localStorage.getItem("userExperience");
    const savedIndustries = localStorage.getItem("userIndustries");

    if (savedGoal || savedName || savedSkills || savedInterests || savedEducation || savedExperience || savedIndustries) {
      if (savedGoal) setGoal(savedGoal);
      if (savedName) setName(savedName);
      if (savedSkills) setSkills(savedSkills);
      if (savedInterests) setInterests(savedInterests);
      if (savedEducation) setEducation(savedEducation);
      if (savedExperience) setExperience(savedExperience);
      if (savedIndustries) setIndustries(savedIndustries);
      setMessage(`Welcome ${savedName || "User"}, your current goal is: ${savedGoal || "(none set yet)"}`);
    }
  }, []);

  const handleClick = () => {
    localStorage.setItem("careerGoal", goal);
    localStorage.setItem("userName", name);
    localStorage.setItem("userSkills", skills);
    localStorage.setItem("userInterests", interests);
    localStorage.setItem("userEducation", education);
    localStorage.setItem("userExperience", experience);
    localStorage.setItem("userIndustries", industries);
    setMessage(`Welcome ${name}, your career goal is saved: ${goal}`);
  };

  const handleReset = () => {
    localStorage.clear();
    setGoal("");
    setName("");
    setSkills("");
    setInterests("");
    setEducation("");
    setExperience("");
    setIndustries("");
    setMessage("");
  };

  return (
    <div>
      <h1>Profile Page</h1>
      <p>Fill in your information to personalize your career journey.</p>

      <div style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '8px', maxWidth: '400px' }}>
        <label>Name</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your name" style={{ padding: '0.5rem', width: '100%', marginBottom: '1rem' }} />

        <label>Career Goal</label>
        <input type="text" value={goal} onChange={(e) => setGoal(e.target.value)} placeholder="Enter your career goal" style={{ padding: '0.5rem', width: '100%', marginBottom: '1rem' }} />

        <label>Skills</label>
        <input type="text" value={skills} onChange={(e) => setSkills(e.target.value)} placeholder="Enter your skills (e.g. Excel, Python)" style={{ padding: '0.5rem', width: '100%', marginBottom: '1rem' }} />

        <label>Interests</label>
        <input type="text" value={interests} onChange={(e) => setInterests(e.target.value)} placeholder="Enter your interests (e.g. sports, health)" style={{ padding: '0.5rem', width: '100%', marginBottom: '1rem' }} />

        {/* Toggle Button (moved above the expandable section) */}
        <div style={{ marginBottom: '1rem' }}>
          <button onClick={() => setShowMore(!showMore)}>
            {showMore ? "Hide extra fields" : "Show more options"}
          </button>
        </div>

        {showMore && (
          <>
            <label>Education Level</label>
            <input type="text" value={education} onChange={(e) => setEducation(e.target.value)} placeholder="e.g. Bachelor's, A-Levels" style={{ padding: '0.5rem', width: '100%', marginBottom: '1rem' }} />

            <label>Experience Level</label>
            <input type="text" value={experience} onChange={(e) => setExperience(e.target.value)} placeholder="e.g. 0–1 years" style={{ padding: '0.5rem', width: '100%', marginBottom: '1rem' }} />

            <label>Preferred Industries</label>
            <input type="text" value={industries} onChange={(e) => setIndustries(e.target.value)} placeholder="e.g. tech, healthcare" style={{ padding: '0.5rem', width: '100%', marginBottom: '1rem' }} />
          </>
        )}

        <button onClick={handleClick} style={{ padding: '0.5rem 1rem', fontWeight: 'bold', marginRight: '1rem' }}>Submit</button>
        <button onClick={handleReset} style={{ padding: '0.5rem 1rem', backgroundColor: '#f44336', color: '#fff', fontWeight: 'bold' }}>Reset</button>
      </div>

      {message && <p style={{ marginTop: '1.5rem', fontWeight: 'bold' }}>{message}</p>}
    </div>
  );
}

export default App;
