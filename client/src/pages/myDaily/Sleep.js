import React, { useState } from 'react';

const SleepCheckbox = ({ setSleep, sleep }) => {
  const [isChecked, setIsChecked] = useState(false);
  const [sleepStartTime, setSleepStartTime] = useState(null);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    if (!isChecked) {
      // Checkbox is checked (time to sleep)
      setSleepStartTime(new Date());
    } else {
      // Checkbox is unchecked (time to wake up)
      if (sleepStartTime !== null) {
        const wakeUpTime = new Date();
        const timeDifference = wakeUpTime - sleepStartTime;
        const hours = timeDifference / (1000 * 60 * 60); // Convert milliseconds to hours
        setSleep(hours.toFixed(2));
      }
    }
  };

  const handleAddHour = () => {
    setSleep(prevSleepHours => (parseFloat(prevSleepHours) + 1).toFixed(2));
  };

  const handleSubtractHour = () => {
    setSleep(prevSleepHours => (parseFloat(prevSleepHours) - 1).toFixed(2));
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
        Zzz's in the Bank: Deposited {sleep} Hours of Sleep!

      </label>
      <br />
      <button style={{ width: '50px', margin: '10px'}} onClick={handleAddHour}>+</button>
      <button style={{ width: '50px', margin: '10px'}} onClick={handleSubtractHour}>-</button>
    </div>
  );
};

export default SleepCheckbox;
