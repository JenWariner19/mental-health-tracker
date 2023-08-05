import React, {useState} from 'react';
// Grab the thougthts data from the API
// import ThoughtList from '../MyJournal;'


const Gratefuls = ({ setGratefuls, gratefuls }) => {

  const [clearedTextarea, setClearedTextarea] = useState(false);

  const handleChange = (event) => {
    setGratefuls(event.target.value);
    setClearedTextarea(true);
  };

  return (
    <div style={{ margin: '10px'}}>
      <h3>Glowing with Gratitude: Enter Your Positivity Here!</h3>
      <textarea
            name="gratefulText"
            placeholder="Today I am grateful for..."
            value={gratefuls}
            className="form-input w-100"
            onChange={handleChange}
            rows={3}
            style={{ margin: '10px'}}
          ></textarea>
    </div>
  );
};

export default Gratefuls;
