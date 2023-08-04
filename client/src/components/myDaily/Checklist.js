import React from 'react';

const CheckboxList = ({ checkboxValues, setCheckboxValues }) => {

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
      {Object.entries(checkboxValues).map(([name, checked]) => (
        <div key={name}>
          <input
            type="checkbox"
            name={name}
            checked={checked}
            onChange={handleCheckboxChange}
          />
          <label htmlFor={name}>{name}</label>
        </div>
      ))}
    </div>
  );
};

export default CheckboxList;
