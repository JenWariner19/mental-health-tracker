import React, { useState } from 'react';

const CheckboxList = () => {
  // State to keep track of checkbox values
  const [checkboxValues, setCheckboxValues] = useState({
    workout: false,
    sunlight: false,
    supplements: false,
    selfCare: false,
  });

  // Handler function to update checkbox values
  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setCheckboxValues((prevValues) => ({
      ...prevValues,
      [name]: checked,
    }));
  };

  return (
    <div>
      <h2>Did I?:</h2>
      <div>
        <input
          type="checkbox"
          name="workout"
          checked={checkboxValues.workout}
          onChange={handleCheckboxChange}
        />
        <label htmlFor="workout">Workout?</label>
      </div>
      <div>
        <input
          type="checkbox"
          name="sunlight"
          checked={checkboxValues.sunlight}
          onChange={handleCheckboxChange}
        />
        <label htmlFor="sunlight">Get Sunlight?</label>
      </div>
      <div>
        <input
          type="checkbox"
          name="supplements"
          checked={checkboxValues.supplements}
          onChange={handleCheckboxChange}
        />
        <label htmlFor="supplements">Take My Supplements?</label>
      </div>
      <div>
        <input
          type="checkbox"
          name="selfCare"
          checked={checkboxValues.selfCare}
          onChange={handleCheckboxChange}
        />
        <label htmlFor="selfCare">Self-Care Routine?</label>
      </div>
    </div>
  );
};

export default CheckboxList;
