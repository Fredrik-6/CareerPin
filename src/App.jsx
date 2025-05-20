// CareerPin Basic Starter App with Routing
// Stage 4.2: Add 'Save AI Suggestion' button to localStorage

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
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);

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
    setPrompt("");
    setAiResponse("");
    setMessage("");
  };

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

  const handleCopy = () => {
    if (!aiResponse) return;
    navigator.clipboard.writeText(aiResponse).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleSave = () => {
    if (!aiResponse) return;
    const saved = JSON.parse(localStorage.getItem("careerpin_suggestions") || "[]");
    saved.push({ date: new Date().toISOString(), suggestion: aiResponse });
    localStorage.setItem("careerpin_suggestions", JSON.stringify(saved));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div>
      <h1>Profile Page</h1>
      <p>Fill in your information to personalize your career journey.</p>

      <div style={{ border: '1px solid #ccc', backgroundColor: '#2b2b2b', color: '#fff', padding: '1rem', borderRadius: '8px', maxWidth: '400px' }}>
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
        <div style={{ marginTop: '1rem' }}>
          <button onClick={generatePrompt} style={{ padding: '0.5rem 1rem', backgroundColor: '#4CAF50', color: '#fff' }}>Generate Suggestions</button>
        </div>
      </div>

      {message && <p style={{ marginTop: '1.5rem', fontWeight: 'bold' }}>{message}</p>}

      {prompt && (
        <div style={{ marginTop: '2rem', backgroundColor: '#333', padding: '1rem', borderRadius: '8px', color: '#fff' }}>
          <h3>Generated AI Prompt:</h3>
          <pre>{prompt}</pre>
        </div>
      )}

      {aiResponse && (
        <div style={{ marginTop: '2rem', backgroundColor: '#2d4f2d', padding: '1rem', borderRadius: '8px', color: '#fff' }}>
          <h3>AI Suggestions:</h3>
          <pre>{aiResponse}</pre>
          <button onClick={handleCopy} style={{ marginTop: '0.5rem', backgroundColor: '#3a7f3a', color: 'white', padding: '0.5rem', marginRight: '1rem' }}>
            {copied ? "Copied!" : "Copy to Clipboard"}
          </button>
          <button onClick={handleSave} style={{ marginTop: '0.5rem', backgroundColor: '#5c85d6', color: 'white', padding: '0.5rem' }}>
            {saved ? "Saved!" : "Save Suggestion"}
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
