import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import { Container, Button } from "react-bootstrap";
import { ADD_JOURNAL_ENTRY } from '../../utils/mutations';

import MoodButton from './Mood';
import WaterIntakeCheckbox from './Water';
import Gratefuls from './Gratefuls';
import SleepCheckbox from './Sleep';
import CheckboxList from './Checklist';

const MyDaily = () => {
  const [addJournalEntry, { error }] = useMutation(ADD_JOURNAL_ENTRY);

  const [showMessage, setShowMessage] = useState(false); // New state for showing the message

  const [checkboxValues, setCheckboxValues] = useState({
    workout: false,
    sunlight: false,
    supplements: false,
    selfCare: false,
  });
  const [mood, setMood] = useState("");
  const [waterIntake, setWaterIntake] = useState(0);
  const [gratefuls, setGratefuls] = useState('');
  const [sleep, setSleep] = useState(0);

  const handleAddJournalEntry = async () => {

    try {
      const { data } = await addJournalEntry({
        variables: {
          mood,
          checkList: checkboxValues,
          waterIntake,
          gratefuls,
          sleep,
        },
      });


      setShowMessage(true); // Show the message on successful entry creation
      // Clear the input fields or take some other action here...
    } catch (error) {
      console.error('Error adding new Journal Entry:', error.message);
    }
  };


  return (
    <div className="header-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', margin: '15px' }}>
      <div>
        <h2 style={{ backgroundColor: '#11b8b1', color: 'white', padding: '10px', borderRadius: '5px', marginBottom: '20px' }}>Ready, Set, Achieve: Nail Your Daily Checklist!</h2>
      </div>
      <div style={{ marginBottom: '20px', marginLeft: '20px' }}>
        <CheckboxList checkboxValues={checkboxValues} setCheckboxValues={setCheckboxValues} />
      </div>
      <div style={{ marginBottom: '20px', marginLeft: '20px' }}>
        <MoodButton setMood={setMood} mood={mood} />
      </div>
      <div style={{ marginBottom: '20px', marginLeft: '20px' }}>
        <WaterIntakeCheckbox setWaterIntake={setWaterIntake} waterIntake={waterIntake} />
      </div>
      <div style={{ marginBottom: '20px', marginLeft: '20px' }}>
        <Gratefuls setGratefuls={setGratefuls} gratefuls={gratefuls} />
      </div>
      <div style={{ marginBottom: '20px', marginLeft: '20px' }}>
        <SleepCheckbox setSleep={setSleep} sleep={sleep} />
      </div>
      <div style={{ marginBottom: '20px', marginLeft: '20px' }}>
        <button
          className="btn btn-primary btn-block btn-squared w-100"
          type="submit"
          onClick={handleAddJournalEntry}
        >
          Save Daily Checklist Entry
        </button>
      </div>
      {showMessage && (
        <div style={{ backgroundColor: '#11b8b1', color: 'white', padding: '10px', borderRadius: '5px', marginBottom: '20px' }}>
          Your daily entry has been saved to your calendar!
          <Link to={`/myJournal`}>
          <Button
            className="btn-block btn-primary"
            style={{ margin: '15px', backgroundColor: 'white', color: 'Black', fontSize: 'px' }}
          >
            Visit My Calender
          </Button>
          </Link>
        </div>

      )}
      {error && (
        <div className="col-12 my-3 bg-danger text-white p-3">
          Something went wrong...8
        </div>
      )}
    </div>
  );

};



export default MyDaily;