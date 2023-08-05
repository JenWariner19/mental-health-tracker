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

  const { loading, data } = useQuery(QUERY_ME, {
    variables: { journalEntryId: journalEntryId },
  });

  const journalEntry =
    data?.me.journalEntries.find((entry) => entry._id === journalEntryId) || {};

  const [updateJournal, { error }] = useMutation(UPDATE_JOURNAL);
  const [removeJournalEntry, { err }] = useMutation(REMOVE_JOURNAL);

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
  const [successMessage, setSuccessMessage] = useState(""); // Define a state variable for success message

  useEffect(() => {
    if (!loading && journalEntry) {
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
  }, [loading, journalEntry]);

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
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className="header-content">
        <div>
          <CheckboxList
            checkboxValues={checkboxValues}
            setCheckboxValues={setCheckboxValues}
          />
        </div>
        <div>
          <MoodButton setMood={setMood} mood={mood} />
        </div>
        <div>
          <WaterIntakeCheckbox
            setWaterIntake={setWaterIntake}
            waterIntake={waterIntake}
          />
        </div>
        <div>
          <Gratefuls setGratefuls={setGratefuls} gratefuls={gratefuls} />
        </div>
        <div>
          <SleepCheckbox setSleep={setSleep} sleep={sleep} />
        </div>
        <div>
          <div>
            <Button
              className="btn-block btn-primary"
              onClick={() => {
                handleUpdateJournal();
              }}
            >
              Update Entry
            </Button>
            <Button
              className="btn-block btn-primary"
              onClick={() => {
                handleDeleteEntry();
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
