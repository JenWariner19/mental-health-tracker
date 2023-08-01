import React from "react";
import { Container, Card, Button, Row, Col } from "react-bootstrap";
import Auth from "../utils/auth";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_ME } from "../utils/queries";
import { REMOVE_JOURNAL } from '../utils/mutations'

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

  
  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <div fluid className="text-light bg-dark p-5">
        <Container>
          <h1>My Journal Entries</h1>
        </Container>
      </div>
      <Container>
        <h2 className="pt-5">
          {userData.journalEntries.length
            ? `Viewing ${userData.journalEntries.length} journal ${
                userData.journalEntries.length === 1 ? "entry" : "entries"
              }:`
            : "You have no journal entries!"}
        </h2>
        <Row>
          {/* Implement the calendar layout here */}
          {userData.journalEntries.map((entry) => {
            return (
              <Col key={`col-${entry._id}`} md="4">
                <Card key={entry._id} border="dark">
                  {/* Here you can customize your emoji icons  */}
                  <Card.Body>
                    <Card.Title>{entry.date}</Card.Title>
                    <p>Mood: {entry.mood}</p>
                    {/* Add more journal entry details as needed */}
                    {/* You can create a modal or a separate page to show the complete journal entry when clicked */}
                    <Button
                      className="btn-block btn-danger"
                      onClick={() => handleDeleteEntry(entry._id)}
                    >
                      Delete this Entry!
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default MyJournal;
