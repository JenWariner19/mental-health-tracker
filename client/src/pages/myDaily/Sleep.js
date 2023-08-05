import React from 'react';

const SleepCheckbox = ({ setSleep, sleep }) => {
  const handleAddHour = () => {
    setSleep(prevSleepHours => (parseFloat(prevSleepHours) + 1).toFixed(2));
  };

  const handleSubtractHour = () => {
    setSleep(prevSleepHours => (parseFloat(prevSleepHours) - 1).toFixed(2));
  };

  return (
    <div style={{ margin: '10px'}}>
      <label>
        Zzz's in the Bank: Deposited {sleep} Hours of Sleep!
      </label>
      <br />
      <button style={{ width: '50px', margin: '10px'}} onClick={handleAddHour}>+</button>
      <button style={{ width: '50px', margin: '10px'}} onClick={handleSubtractHour}>-</button>
    </div>
  );
};

export default SleepCheckbox;

