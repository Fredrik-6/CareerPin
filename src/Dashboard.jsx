import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Dashboard() {
  const [profile, setProfile] = useState(null);
  const [savedCount, setSavedCount] = useState(0);
  const [latestSuggestion, setLatestSuggestion] = useState("");
  const [latestDate, setLatestDate] = useState("");
  const [relatedLinks, setRelatedLinks] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("userProfile"));
    const suggestions = JSON.parse(localStorage.getItem("careerpin_suggestions") || "[]");
    setProfile(stored);
    setSavedCount(suggestions.length);
    if (suggestions.length > 0) {
      const last = suggestions[suggestions.length - 1];
      setLatestSuggestion(last.suggestion);
      setLatestDate(new Date(last.date).toLocaleString());
      // Mock related links for each line in the suggestion
      const generatedLinks = last.suggestion
        .split("\n") // Split suggestion text line-by-line
        .filter(line => line.trim() !== "")
        .map(line => ({
          text: line.trim(),
          links: [
            `https://www.google.com/search?q=${encodeURIComponent(line.trim() + " course")}`,
            `https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent(line.trim())}`
          ]
        }));
      setRelatedLinks(generatedLinks);
    }
  }, []);

  const handleDeleteLast = () => {
    const suggestions = JSON.parse(localStorage.getItem("careerpin_suggestions") || "[]");
    suggestions.pop();
    localStorage.setItem("careerpin_suggestions", JSON.stringify(suggestions));
    setSavedCount(suggestions.length);
    if (suggestions.length > 0) {
      const last = suggestions[suggestions.length - 1];
      setLatestSuggestion(last.suggestion);
      setLatestDate(new Date(last.date).toLocaleString());
    } else {
      setLatestSuggestion("");
      setLatestDate("");
      setRelatedLinks([]);
    }
  };

  return (
    <div style={{ display: 'flex', backgroundColor: '#1e1e1e', color: '#fff', minHeight: '100vh' }}>
      <div style={{ flex: 3, padding: '2rem' }}>
        <h1>Dashboard</h1>

        {profile?.name && (
          <p style={{ fontSize: '1.2rem', marginBottom: '1.5rem' }}>
            Welcome back, <strong>{profile.name}</strong>!
          </p>
        )}

        <div style={{ backgroundColor: '#2b2b2b', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem' }}>
          <h2>User Summary</h2>
          {profile ? (
            <>
              <p><strong>Name:</strong> {profile.name}</p>
              <p><strong>Goal:</strong> {profile.goal}</p>
              <p><strong>Skills:</strong> {profile.skills}</p>
            </>
          ) : (
            <p>No profile data saved yet.</p>
          )}
        </div>

        <div style={{ backgroundColor: '#2b2b2b', padding: '1rem', borderRadius: '8px' }}>
          <h2>Saved Suggestions</h2>
          <p>You have <strong>{savedCount}</strong> saved suggestion(s).</p>
          {savedCount > 0 && (
            <div style={{ marginTop: '1rem', backgroundColor: '#344834', padding: '1rem', borderRadius: '6px' }}>
              <h4>Most Recent Suggestion:</h4>
              <small>Saved on: {latestDate}</small>
              <pre style={{ whiteSpace: 'pre-wrap' }}>{latestSuggestion}</pre>
              <button onClick={handleDeleteLast} style={{ marginTop: '0.5rem', backgroundColor: '#f44336', color: '#fff', padding: '0.5rem 1rem', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                Delete Last Suggestion
              </button>
            </div>
          )}
        </div>

        <div style={{ marginTop: '2rem' }}>
          <Link to="/profile" style={{ color: '#61dafb', marginRight: '2rem' }}>Go to Profile</Link>
          <Link to="/saved" style={{ color: '#61dafb' }}>View Saved Suggestions</Link>
        </div>
      </div>

      <div style={{ flex: 2, padding: '2rem', backgroundColor: '#2e2e2e', borderLeft: '1px solid #444' }}>
        <h2>Relevant Links</h2>
        {relatedLinks.length === 0 ? (
          <p>No suggestion links available yet.</p>
        ) : (
          <ul style={{ paddingLeft: '1rem' }}>
            {relatedLinks.map((item, index) => (
              <li key={index} style={{ marginBottom: '1rem' }}>
                <div style={{ fontSize: '0.95rem', marginBottom: '0.25rem' }}></div>
                <div><strong>{item.text}</strong></div>
                <div>
                  <a href={item.links[0]} target="_blank" rel="noopener noreferrer" style={{ color: '#61dafb', marginRight: '1rem' }}>Course</a>
                  <a href={item.links[1]} target="_blank" rel="noopener noreferrer" style={{ color: '#61dafb' }}>Jobs</a>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Dashboard;

// Old Home component removed. Dashboard now serves as the default landing page.