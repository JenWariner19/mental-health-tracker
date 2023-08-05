import React from 'react';

const MoodButton = ({ setMood, mood }) => {

    const handleButtonClick = (selectedMood) => {
      setMood(selectedMood);
    };
  
    const moods = ['😊', '😢', '😡', '😴'];
  
    return (
      <div style={{ margin: '10px'}}>
        <h2>Today I am feeling:</h2>
        <div style={{ margin: '10px'}}>
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
        <p style={{ margin: '10px', fontSize: '20px'}}>
          {mood ? `Today's mood: ${mood}` : 'Select an Emoji to Match Your Mood'}
        </p>
      </div>
    );
  };
  
  export default MoodButton;