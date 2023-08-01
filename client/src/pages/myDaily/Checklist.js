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
      <h2>Self-Care Checklist</h2>
      <div>
        <input
          type="checkbox"
          name="workout"
          checked={checkboxValues.workout}
          onChange={handleCheckboxChange}
        />
        <label htmlFor="workout">Did you workout?</label>
      </div>
      <div>
        <input
          type="checkbox"
          name="sunlight"
          checked={checkboxValues.sunlight}
          onChange={handleCheckboxChange}
        />
        <label htmlFor="sunlight">Get sunlight?</label>
      </div>
      <div>
        <input
          type="checkbox"
          name="supplements"
          checked={checkboxValues.supplements}
          onChange={handleCheckboxChange}
        />
        <label htmlFor="supplements">Take supplements?</label>
      </div>
      <div>
        <input
          type="checkbox"
          name="selfCare"
          checked={checkboxValues.selfCare}
          onChange={handleCheckboxChange}
        />
        <label htmlFor="selfCare">Self-care?</label>
      </div>
    </div>
  );
};

export default CheckboxList;
