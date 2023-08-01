import React from 'react';

const MyThoughts = () => {
  const thoughts = [

  ];

  return (
    <div>
      <h2>My Thoughts</h2>
      <ul>
        {thoughts.map((thought, index) => (
          <li key={index}>{thought}</li>
        ))}
      </ul>
    </div>
  );
};

export default MyThoughts;