import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useMutation } from "@apollo/client";
import { ADD_JOURNAL_ENTRY } from "../../utils/mutations";
import CheckboxList from '../../components/myDaily/Checklist';
import MoodButton from '../../components/myDaily/Mood';
import WaterIntakeCheckbox from '../../components/myDaily/Water';
import Gratefuls from '../../components/myDaily/Gratefuls';
import SleepCheckbox from '../../components/myDaily/Sleep';

import Auth from '../../utils/auth';

const MyDaily = () => {
  const [addJournalEntry, { error }] = useMutation(ADD_JOURNAL_ENTRY);

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
  
    console.log({
        mood,
        checkList: checkboxValues,
        waterIntake,
        gratefuls,
        sleep,
      });

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
    
      console.log('New Journal Entry added successfully:', data);
      // Clear the input fields or take some other action here...
    } catch (error) {
      console.error('Error adding new Journal Entry:', error);
    }
  };


  return (
    <div className="header-content">
      <div>
        <h2>Write your daily journal entry here:</h2>
      </div>
      <div>
        <CheckboxList checkboxValues={checkboxValues} setCheckboxValues={setCheckboxValues} />
      </div>
      <div>
        <MoodButton setMood={setMood} mood={mood}/>
      </div>
      <div>
        <WaterIntakeCheckbox setWaterIntake={setWaterIntake} waterIntake={waterIntake} />
      </div>
      <div>
        <Gratefuls setGratefuls={setGratefuls} gratefuls={gratefuls} />
      </div>
      <div>
        <SleepCheckbox setSleep={setSleep} sleep={sleep} />
      </div>
      <div>
        <button
          className="btn btn-primary btn-block btn-squared w-100"
          type="submit"
          onClick={handleAddJournalEntry}
        >
          Save Journal Entry
        </button>
      </div>
      {error && (
          <div className="col-12 my-3 bg-danger text-white p-3">
            Something went wrong...
          </div>
        )}
    </div>
  );
};

export default MyDaily;
// Each child component will need to be modified to call the setter functions passed down to them when the user makes a selection/input.






