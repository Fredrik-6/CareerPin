import React, { useEffect, useState } from 'react';

function SavedSuggestions() {
  const [savedSuggestions, setSavedSuggestions] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('careerpin_suggestions') || '[]');
    setSavedSuggestions(saved);
  }, []);

  return (
    <div style={{ padding: '2rem', backgroundColor: '#1e1e1e', color: '#fff', minHeight: '100vh' }}>
      <h1>Saved Suggestions</h1>

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
        </div>
      )}
    </div>
  );
}

export default SavedSuggestions;
