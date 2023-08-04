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
  const [mood, setMood] = useState(null);
  const [waterIntake, setWaterIntake] = useState(0);
  const [gratefuls, setGratefuls] = useState('');
  const [sleep, setSleep] = useState(0);

  const handleAddJournalEntry = () => {
    const newJournalEntry = {
        checkboxValues,
        mood,
        waterIntake,
        gratefuls,
        sleep
      };
  
      console.log(newJournalEntry);
    
    addJournalEntry({
      variables: {
        input: {
          checkList: checkboxValues,
          mood,
          waterIntake,
          gratefuls,
          sleep
        }
      }
    });
  };

  return (
    <div className="header-content">
      <div>
        <CheckboxList checkboxValues={checkboxValues} setCheckboxValues={setCheckboxValues} />
        {console.log(checkboxValues)}
      </div>
      <div>
        <MoodButton setMood={setMood} mood={mood}/>
        {console.log(mood)}
      </div>
      <div>
        <WaterIntakeCheckbox setWaterIntake={setWaterIntake} waterIntake={waterIntake} />
        {console.log(waterIntake)}
      </div>
      <div>
        <Gratefuls setGratefuls={setGratefuls} gratefuls={gratefuls} />
        {console.log(gratefuls)}
      </div>
      <div>
        <SleepCheckbox setSleep={setSleep} sleep={sleep} />
        {console.log(sleep)}
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






