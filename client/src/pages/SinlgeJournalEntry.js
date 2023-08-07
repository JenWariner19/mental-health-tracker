import React, { useState, useEffect } from "react";
import { Container, Button, Alert } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_ME } from "../utils/queries";
import { REMOVE_JOURNAL, UPDATE_JOURNAL } from "../utils/mutations";

import CheckboxList from "./myDaily/Checklist";
import MoodButton from "./myDaily/Mood";
import WaterIntakeCheckbox from "./myDaily/Water";
import Gratefuls from "./myDaily/Gratefuls";
import SleepCheckbox from "./myDaily/Sleep";

import Auth from "../utils/auth";

const SingleJournalEntry = () => {
  const { journalEntryId } = useParams();

  const [checkboxValues, setCheckboxValues] = useState({
    workout: false,
    sunlight: false,
    supplements: false,
    selfCare: false,
  });
  const [mood, setMood] = useState("");
  const [waterIntake, setWaterIntake] = useState(0);
  const [gratefuls, setGratefuls] = useState("");
  const [sleep, setSleep] = useState(0);
  const [successMessage, setSuccessMessage] = useState("");
  const [isDeleted, setIsDeleted] = useState(false);

  const [updateJournal, { error }] = useMutation(UPDATE_JOURNAL);
  const [removeJournalEntry, { err }] = useMutation(REMOVE_JOURNAL);

  const { loading, data } = useQuery(QUERY_ME, {
    variables: { journalEntryId: journalEntryId },
  });

  useEffect(() => {
    if (!loading && data) {
      const journalEntry =
        data?.me.journalEntries.find((entry) => entry._id === journalEntryId) ||
        {};

      const { workout, sunlight, supplements, selfCare } =
        journalEntry.checkList || {};

      setCheckboxValues({
        workout: Boolean(workout),
        sunlight: Boolean(sunlight),
        supplements: Boolean(supplements),
        selfCare: Boolean(selfCare),
      });
      setMood(journalEntry.mood || "");
      setWaterIntake(journalEntry.waterIntake || 0);
      setGratefuls(journalEntry.gratefuls || "");
      setSleep(journalEntry.sleep || 0);
    }
  }, [loading, data, journalEntryId]);


  const handleUpdateJournal = async () => {
    try {
      const { data } = await updateJournal({
        variables: {
          journalEntryId,
          mood,
          checkList: checkboxValues,
          waterIntake,
          gratefuls,
          sleep,
        },
      });

      console.log("Journal Entry updated successfully:", data);
      setSuccessMessage("Journal Entry updated successfully!"); // Set the success message
    } catch (error) {
      console.error("Error updating Journal Entry:", error);
    }
  };

  const handleDeleteEntry = async (journalEntryId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      await removeJournalEntry({
        variables: { journalEntryId },
        refetchQueries: [{ query: QUERY_ME }],
      });

      setIsDeleted(true); // Set isDeleted to true after successful delete
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  } else if (isDeleted) {
    // Show the deleted message and links back to journal and daily checklist
    return (
      <div className="header-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', margin: '15px' }}>
        <Alert variant="success" className="mt-3">
          Journal Entry deleted successfully!
        </Alert>
        <Button
          className="btn-block btn-primary"
          style={{ margin: '10px' }}
          href="/myJournal" 
        >
          Back to Journal
        </Button>
        <Button
          className="btn-block btn-primary"
          style={{ margin: '10px' }}
          href="/myDaily" 
        >
          Back to Daily Checklist
        </Button>
      </div>
    );
  } else {
    // Show the journal entry form
    return (
      <div className="header-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', margin: '15px' }}>
        <div>
          <h2 style={{ backgroundColor: '#11b8b1', color: 'white', padding: '10px', borderRadius: '5px', marginBottom: '20px' }}>Crush Your Goals: Give Your Checklist a Power Boost!</h2>
        </div>
        <div style={{ marginBottom: '20px', marginLeft: '20px' }}>
          <CheckboxList
            checkboxValues={checkboxValues}
            setCheckboxValues={setCheckboxValues}
          />
        </div>
        <div style={{ marginBottom: '20px', marginLeft: '20px' }}>
          <MoodButton setMood={setMood} mood={mood} />
        </div>
        <div style={{ marginBottom: '20px', marginLeft: '20px' }}>
          <WaterIntakeCheckbox
            setWaterIntake={setWaterIntake}
            waterIntake={waterIntake}
          />
        </div>
        <div style={{ marginBottom: '20px', marginLeft: '20px' }}>
          <Gratefuls setGratefuls={setGratefuls} gratefuls={gratefuls} />
        </div>
        <div style={{ marginBottom: '20px', marginLeft: '20px' }}>
          <SleepCheckbox setSleep={setSleep} sleep={sleep} />
        </div>
        <div style={{ marginBottom: '20px', marginLeft: '20px' }}>
          <div>
            <Button
              className="btn-block btn-primary"
              style={{ margin: '10px' }}
              onClick={() => {
                handleUpdateJournal();
              }}
            >
              Update Entry
            </Button>
            <Button
              className="btn-block btn-primary"
              style={{ margin: '10px' }}
              onClick={() => {
                handleDeleteEntry(journalEntryId);
              }}
            >
              Delete Entry
            </Button>
          </div>
          {/* Render success message when it's available */}
          {successMessage && (
            <Alert variant="success" className="mt-3">
              {successMessage}
            </Alert>
          )}
        </div>
        {error && (
          <div className="col-12 my-3 bg-danger text-white p-3">
            Something went wrong...
          </div>
        )}
      </div>
    );
  }
};

export default SingleJournalEntry;
