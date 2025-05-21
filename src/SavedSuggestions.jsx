import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function SavedSuggestions() {
  const [savedSuggestions, setSavedSuggestions] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('careerpin_suggestions') || '[]');
    setSavedSuggestions(saved);
  }, []);

  const handleClearAll = () => {
    localStorage.removeItem('careerpin_suggestions');
    setSavedSuggestions([]);
  };

  return (
    <div style={{ padding: '2rem', backgroundColor: '#1e1e1e', color: '#fff', minHeight: '100vh' }}>
      <h1>Saved Suggestions</h1>
      <Link to="/profile" style={{ color: '#61dafb', display: 'inline-block', marginBottom: '1rem' }}>
        ← Back to Profile
      </Link>

      {savedSuggestions.length === 0 ? (
        <p>No saved suggestions yet.</p>
      ) : (
        <div style={{ marginTop: '1rem' }}>
          {savedSuggestions.map((item, index) => (
            <div
              key={index}
              style={{
                backgroundColor: '#2d4f2d',
                padding: '1rem',
                borderRadius: '8px',
                marginBottom: '1rem',
                color: '#fff',
              }}
            >
              <strong>{new Date(item.date).toLocaleString()}</strong>
              <pre style={{ whiteSpace: 'pre-wrap' }}>{item.suggestion}</pre>
            </div>
          ))}

          <button
            onClick={handleClearAll}
            style={{
              marginTop: '1rem',
              backgroundColor: '#f44336',
              color: '#fff',
              padding: '0.5rem 1rem',
              fontWeight: 'bold',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Clear All
          </button>
        </div>
      )}
    </div>
  );
}

export default SavedSuggestions;
