import React from "react"; 

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
      <h2>Today I:</h2>
      <p style={{ fontSize: '16px'}}>(Check all that apply)</p>
      {Object.entries(checkboxValues).map(([name, checked]) => (
        <div key={name} style={{ margin: '10px'}}>
          <input
            type="checkbox"
            name={name}
            checked={checked}
            onChange={handleCheckboxChange}
            style={{ marginRight: '5px'}}
          />
          <label htmlFor={name}>{name}</label>
        </div>
      ))}
    </div>
  );
};

export default CheckboxList;
