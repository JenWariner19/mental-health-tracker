import React, { useState } from 'react';

const WaterIntakeCheckbox = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [waterCount, setWaterCount] = useState(0);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleIncrement = () => {
    setWaterCount(waterCount + 1);
  };

  const handleDecrement = () => {
    if (waterCount > 0) {
      setWaterCount(waterCount - 1);
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
        <span>{waterCount} Glasses of H20</span>
        <button onClick={handleDecrement}>-</button>
      </div>
    </div>
  );
};

export default WaterIntakeCheckbox;
