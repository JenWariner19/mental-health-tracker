import React from 'react';

const WaterIntakeCounter = ({ waterIntake, setWaterIntake }) => {
  const handleIncrement = () => {
    setWaterIntake(waterIntake + 1);
  };

  const handleDecrement = () => {
    if (waterIntake > 0) {
      setWaterIntake(waterIntake - 1);
    }
  };

  return (
    <div style={{ margin: '10px' }}>
      <div>
        <span>Hydration Update: Report Your Glass Count!</span>
      </div>
      <div>
        <button style={{ width: '50px', margin: '10px' }} onClick={handleIncrement}>+</button>
        <span style={{ margin: '10px', fontSize: '20px' }}>{waterIntake} Glasses of H20</span>
        <button style={{ width: '50px', margin: '10px' }} onClick={handleDecrement}>-</button>
      </div>
    </div>
  );
};

export default WaterIntakeCounter;
