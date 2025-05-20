// CareerPin Basic Starter App with Routing
// Now uses fetch() to call OpenAI API for career suggestions in frontend

import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <Router>
      <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif', backgroundColor: '#1e1e1e', color: '#fff', minHeight: '100vh' }}>
        <nav style={{ marginBottom: '2rem' }}>
          <Link to="/" style={{ marginRight: '1rem', fontWeight: 'bold', color: '#61dafb' }}>Home</Link>
          <Link to="/profile" style={{ fontWeight: 'bold', color: '#61dafb' }}>Profile</Link>
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
  const [prompt, setPrompt] = useState("");
  const [aiResponse, setAiResponse] = useState("");

  // Load saved profile from localStorage on first render
  useEffect(() => {
    const saved = localStorage.getItem("userProfile");
    if (saved) {
      const parsed = JSON.parse(saved);
      setUserProfile(parsed);
      setMessage(`Welcome ${parsed.name || "User"}, your current goal is: ${parsed.goal || "(none set yet)"}`);
    }
  }, []);

  // Update the profile state on input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserProfile({ ...userProfile, [name]: value });
  };

  // Save the profile to localStorage and show a message
  const handleSubmit = () => {
    localStorage.setItem("userProfile", JSON.stringify(userProfile));
    setMessage(`Welcome ${userProfile.name}, your career goal is saved: ${userProfile.goal}`);
  };

  // Reset all profile fields and clear localStorage
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
    setPrompt("");
    setAiResponse("");
    setMessage("");
  };

  // Generate a prompt from user profile and call AI API
  const generatePrompt = () => {
    const { name, goal, skills, interests, education, experience, industries } = userProfile;
    const newPrompt = `Based on the following profile:\n` +
      `Name: ${name || "N/A"}\n` +
      `Goal: ${goal || "N/A"}\n` +
      `Skills: ${skills || "N/A"}\n` +
      `Education: ${education || "N/A"}\n` +
      `Experience: ${experience || "N/A"}\n` +
      `Interests: ${interests || "N/A"}\n` +
      `Industries: ${industries || "N/A"}\n` +
      `Please suggest relevant career paths, upskilling courses, and common job titles.`;
    setPrompt(newPrompt);
    fetchAiResponse(newPrompt);
  };

  // Call OpenAI API and store response
  const fetchAiResponse = async (text) => {
    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: text }]
        })
      });
      const data = await response.json();
      if (data.choices && data.choices.length > 0) {
        setAiResponse(data.choices[0].message.content);
      } else {
        setAiResponse("The AI did not return a valid response.");
      }
    } catch (error) {
      console.error("Error from OpenAI API:", error);
      setAiResponse("An error occurred while contacting the AI.");
    }
  };

  return (
    <div>
      <h1>Profile Page</h1>
      <p>Fill in your information to personalize your career journey.</p>

      <div style={{ border: '1px solid #ccc', backgroundColor: '#2b2b2b', color: '#fff', padding: '1rem', borderRadius: '8px', maxWidth: '400px' }}>
        {/* Basic Input Fields */}
        <label>Name</label>
        <input type="text" name="name" value={userProfile.name} onChange={handleChange} placeholder="Enter your name" style={{ padding: '0.5rem', width: '100%', marginBottom: '1rem' }} />

        <label>Career Goal</label>
        <input type="text" name="goal" value={userProfile.goal} onChange={handleChange} placeholder="Enter your career goal" style={{ padding: '0.5rem', width: '100%', marginBottom: '1rem' }} />

        <label>Skills</label>
        <input type="text" name="skills" value={userProfile.skills} onChange={handleChange} placeholder="Enter your skills (e.g. Excel, Python)" style={{ padding: '0.5rem', width: '100%', marginBottom: '1rem' }} />

        <label>Interests</label>
        <input type="text" name="interests" value={userProfile.interests} onChange={handleChange} placeholder="Enter your interests (e.g. sports, health)" style={{ padding: '0.5rem', width: '100%', marginBottom: '1rem' }} />

        {/* Toggle for more fields */}
        <div style={{ marginBottom: '1rem' }}>
          <button onClick={() => setShowMore(!showMore)}>
            {showMore ? "Hide extra fields" : "Show more options"}
          </button>
        </div>

        {/* Extra Profile Fields */}
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

        {/* Submit and Reset Buttons */}
        <button onClick={handleSubmit} style={{ padding: '0.5rem 1rem', fontWeight: 'bold', marginRight: '1rem' }}>Submit</button>
        <button onClick={handleReset} style={{ padding: '0.5rem 1rem', backgroundColor: '#f44336', color: '#fff', fontWeight: 'bold' }}>Reset</button>

        {/* Trigger AI Suggestion */}
        <div style={{ marginTop: '1rem' }}>
          <button onClick={generatePrompt} style={{ padding: '0.5rem 1rem', backgroundColor: '#4CAF50', color: '#fff' }}>Generate Suggestions</button>
        </div>
      </div>

      {/* Display message after submit */}
      {message && <p style={{ marginTop: '1.5rem', fontWeight: 'bold' }}>{message}</p>}

      {/* Display AI Prompt */}
      {prompt && (
        <div style={{ marginTop: '2rem', backgroundColor: '#333', padding: '1rem', borderRadius: '8px', color: '#fff' }}>
          <h3>Generated AI Prompt:</h3>
          <pre>{prompt}</pre>
        </div>
      )}

      {/* Display AI Response */}
      {aiResponse && (
        <div style={{ marginTop: '2rem', backgroundColor: '#2d4f2d', padding: '1rem', borderRadius: '8px', color: '#fff' }}>
          <h3>AI Suggestions:</h3>
          <pre>{aiResponse}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
