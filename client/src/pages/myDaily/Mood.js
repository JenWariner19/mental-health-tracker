import React, { useState } from 'react';

const MoodButton = () => {
    const [mood, setMood] = useState('');
  
    const handleButtonClick = (selectedMood) => {
      setMood(selectedMood);
    };
  
    const moods = ['😊', '😢', '😡', '😴'];
  
    return (
      <div>
        <h2>Today I feel like:</h2>
        <div>
          {moods.map((emoji, index) => (
            <button
              key={index}
              onClick={() => handleButtonClick(emoji)}
              style={{ fontSize: '30px', marginRight: '10px' }}
            >
              {emoji}
            </button>
          ))}
        </div>
        <p>
          {mood ? `Today's mood: ${mood}` : 'Please select your mood'}
        </p>
      </div>
    );
  };
  
  export default MoodButton;