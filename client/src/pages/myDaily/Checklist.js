import React, { useState } from "react";

const CheckboxList = ({ checkboxValues, setCheckboxValues }) => {
  const [isSaved, setIsSaved] = useState(false); // State variable to track if checklist entry is saved
  const [selectedItem, setSelectedItem] = useState("");

  // Handler function to update checkbox values and show the saved message
  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setCheckboxValues((prevValues) => ({
      ...prevValues,
      [name]: checked,
    }));
    setIsSaved(true); // Set the saved message to be visible
    // Hide the message after a brief delay (e.g., 2 seconds)
    setTimeout(() => {
      setIsSaved(false);
    }, 10000);
    setSelectedItem(name);
  };

  return (
    <div>
      <h2>Today I:</h2>
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
      {/* {isSaved && <p style={{ color: "green" }}>Checklist entry is saved!</p>} */}
      <p style={{ margin: '10px', fontSize: '20px'}}>
          {selectedItem ? `You selected: ${selectedItem}` : 'Please select one from the above list'}
        </p>
    </div>
  );
};

export default CheckboxList;

