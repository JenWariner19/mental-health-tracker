import React, { useState } from 'react';

const SleepCheckbox = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [sleepHours, setSleepHours] = useState(0);
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
        setSleepHours(hours.toFixed(2));
      }
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
        I slept for {sleepHours} hours.
      </label>
    </div>
  );
};

export default SleepCheckbox;
