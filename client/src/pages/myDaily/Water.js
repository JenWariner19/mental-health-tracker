import React, { useState } from 'react';

const WaterIntakeCheckbox = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div>
      <label>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
        Water Intake
      </label>
    </div>
  );
};

export default WaterIntakeCheckbox;
