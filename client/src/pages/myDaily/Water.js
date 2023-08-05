import React, { useState } from 'react';

const WaterIntakeCheckbox = ({ waterIntake, setWaterIntake }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleIncrement = () => {
    setWaterIntake(waterIntake + 1);
  };

  const handleDecrement = () => {
    if (waterIntake > 0) {
      setWaterIntake(waterIntake - 1);
    }
  };

  return (
    <div style={{ margin: '10px'}}>
      <label>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
          style={{ fontSize: '30px', marginRight: '10px' }}
        />
        Hydration Update: Report Your Glass Count! 
      </label>
      <div>
        <button style={{ width: '50px', margin: '10px'}} onClick={handleIncrement}>+</button>
        <span style={{ margin: '10px', fontSize: '20px'}}>{waterIntake} Glasses of H20</span>
        <button style={{ width: '50px', margin: '10px'}} onClick={handleDecrement}>-</button>
      </div>
    </div>
  );
};

export default WaterIntakeCheckbox;
