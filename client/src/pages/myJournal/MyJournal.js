import React from "react";
import { Link } from "react-router-dom";
import { Container, Button } from "react-bootstrap";
import Auth from "../../utils/auth";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_ME } from "../../utils/queries";
import { REMOVE_JOURNAL } from "../../utils/mutations";
import MyThoughts from "../../components/MyThoughts";
import "./myJournal.css";
import ThoughtForm from "../../components/ThoughtForm";

const parseDate = (dateString) => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const timePart = dateString.split(" at ")[1];
  const datePart = dateString.split(" at ")[0];

  const month = months.indexOf(datePart.split(" ")[0]) + 1;
  const day = parseInt(datePart.split(" ")[1]);
  const year = parseInt(datePart.split(" ")[2]);

  const hour = parseInt(timePart.split(":")[0]);
  const minute = parseInt(timePart.split(":")[1].split(" ")[0]);
  const period = timePart.split(":")[1].split(" ")[1];

  const hour24Format = period === "pm" && hour !== 12 ? hour + 12 : hour;

  return new Date(Date.UTC(year, month - 1, day, hour24Format, minute));
};

const MyJournal = () => {
  const { loading, data } = useQuery(QUERY_ME);
  const [removeJournalEntry, { error }] = useMutation(REMOVE_JOURNAL);
  const userData = data?.me || {};
  console.log(userData.journalEntries);

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
        const entryDate = parseDate(entry.date);
        return (
          entryDate.getDate() === date.getDate() &&
          entryDate.getMonth() === date.getMonth() &&
          entryDate.getFullYear() === date.getFullYear()
        );
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
        {new Date().toLocaleString("default", { month: "long" })}{" "}
        {new Date().getFullYear()}
      </h2>
      <Container>
        <div
          className="calendar-container mt-5 mb-3"
          style={{ backgroundColor: "#ECEBEB" }}
        >
          <div className="days">
            {/* Change the display to 'flex' */}
            <div className="calendar-flex-container">
              {calendar.map((day) => {
                const classNames = `day day-${day.dayOfWeek}`;

                return (
                  <div key={`day-${day.date}`} className={classNames}>
                    <div className="date-header">
                      {new Date(day.date).toLocaleDateString()}
                    </div>
                    {day.journalEntries.map((entry) => (
                      <div key={`entry-${entry._id}`} className="entry">
                        <Link to={`/singleJournalEntry/${entry._id}`}>
                          <Button className="btn-block btn-primary">
                            View Today's Entry
                          </Button>
                        </Link>
                      </div>
                    ))}
                    {day.journalEntries.length === 0 && (
                      <p className="no-entry">
                        No journal entries for this date
                      </p>
                    )}

                    <div className="thoughts-section">
                      {/* Add your thoughts or emojis here */}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ThoughtForm />
        <h3 style={{ textDecoration: "underline", fontSize: "32px" }}>
          My Thoughts
        </h3>
        <MyThoughts />
      </div>
    </div>
  );
};

export default MyJournal;
