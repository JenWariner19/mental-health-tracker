import React from "react";
import { Link } from "react-router-dom";
import { Container, Card, Button, Row, Col } from "react-bootstrap";
import Auth from "../../utils/auth";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_ME } from "../../utils/queries";
import { REMOVE_JOURNAL } from '../../utils/mutations';
import './myJournal.css';

const MyJournal = () => {
  const { loading, data } = useQuery(QUERY_ME);
  const [removeJournalEntry, { error }] = useMutation(REMOVE_JOURNAL);
  const userData = data?.me || {};

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

  const calendar = [];
  if (!loading && userData.journalEntries) {
    const currentDate = new Date();
    const currentDayOfWeek = currentDate.getDay();
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDayOfWeek); 

    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);

      const journalEntriesForDate = userData.journalEntries.filter((entry) => {
        const entryDate = new Date(entry.date);
        return entryDate.toDateString() === date.toDateString();
      });

      calendar.push({
        date: date.toDateString(),
        dayOfWeek: date.getDay(),
        journalEntries: journalEntriesForDate,
      });
    }
  }

  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <div className="my-journal">
      <h2 className="month-header">
        {new Date().toLocaleString("default", { month: "long" })} {new Date().getFullYear()}
      </h2>
      <Container className="calendar-container mt-5 mb-3">
        <div className="days">
          {calendar.map((day) => {
            const classNames = `day day-${day.dayOfWeek}`;

            return (
              <div key={`day-${day.date}`} className={classNames}>
                <div className="date">{new Date(day.date).getDate()}</div>
                {day.journalEntries.map((entry) => (
                  <div key={`entry-${entry._id}`} className="entry">
                    <Button
                      className="btn-block btn-danger"
                      onClick={() => handleDeleteEntry(entry._id)}
                    >
                      Delete this Entry!
                    </Button>
                  </div>
                ))}
                {day.journalEntries.length === 0 && (
                  <p className="no-entry">No journal entries for this date</p>
                )}
                <Link to={`/daily/${day.date}`}>View Day</Link>
              </div>
            );
          })}
        </div>
      </Container>
    </div>
  );
};

export default MyJournal;