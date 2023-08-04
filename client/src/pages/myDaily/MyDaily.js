import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import CheckboxList from './Checklist';
import MoodButton from './Mood';
import WaterIntakeCheckbox from './Water';
import MyThoughts from './MyJournalThoughts';
import SleepCheckbox from './Sleep';

import Auth from '../../utils/auth';

const MyDaily = () => {
    return (
        <div className="header-content">
    <div> <CheckboxList /> </div>
    <div> <MoodButton /> </div>
   <div> <WaterIntakeCheckbox /> </div>
  <div> <MyThoughts /> </div>
  <div>  <SleepCheckbox /> </div>
    </div>
    );
};

export default MyDaily;