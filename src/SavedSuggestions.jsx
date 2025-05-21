import React, { useEffect, useState } from 'react';

function SavedSuggestions() {
  const [savedSuggestions, setSavedSuggestions] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('careerpin_suggestions') || '[]');
    setSavedSuggestions(saved);
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Saved Suggestions</h1>
    </div>
  );
}

export default SavedSuggestions;
