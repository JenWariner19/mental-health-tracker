import React, { useState } from 'react';

const WaterIntakeCheckbox = ({ setWaterIntake, waterIntake }) => {
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
    <div>
      <label>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
        Hydrate yourself!
      </label>
      <div>
        <button onClick={handleIncrement}>+</button>
        <span>{waterIntake} Glasses of H20</span>
        <button onClick={handleDecrement}>-</button>
      </div>
    </div>
  );
};

export default WaterIntakeCheckbox;
