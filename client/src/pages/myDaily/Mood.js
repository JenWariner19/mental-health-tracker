import React from 'react';

const MoodButton = ({ setMood, mood }) => {
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
          {mood ? `Today's mood: ${mood}` : 'Please enter how you feel today.'}
        </p>
      </div>
    );
  };
  
  export default MoodButton;