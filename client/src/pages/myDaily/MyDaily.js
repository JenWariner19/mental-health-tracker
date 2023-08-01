import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import CheckboxList from './Checklist';
import MoodButton from './Mood';
import WaterIntakeCheckbox from './Water';
import MyThoughts from './MyJournalThoughts';
import SleepCheckbox from './Sleep';

import Auth from '../../utils/auth';

const MyDaily = () => {(
    <div>
    <CheckboxList />
    <MoodButton />
    <WaterIntakeCheckbox />
    <MyThoughts />
    <SleepCheckbox />
    </div>


)

};