import React, { useState, useEffect } from 'react';
// Grab the thougthts data from the API
// import ThoughtList from '../MyJournal;'


const ThoughtsComponent = () => {
  const [thoughts, setThoughts] = useState([]);

  // Fetch the thoughts data from the server
  const fetchThoughts = async () => {
    // Fetch the thoughts data from the server
    const response = await fetch('/pages/MyJournal');
    const data = await response.json();
    setThoughts(data);
  };

  useEffect(() => {
    fetchThoughts();
  }, []);
  
  // Function to get the 3 most recent thoughts
  const getRecentThoughts = () => {
    return thoughts.slice(0, 3);
  };

  const recentThoughts = getRecentThoughts();

  return (
    <div>
      <h1>Recent Thoughts</h1>
      <ul>
        {recentThoughts.map((thought) => (
          <li key={thought.id}>{thought.text}</li>
        ))}
      </ul>
    </div>
  );
};

export default ThoughtsComponent;
