import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { useParams } from "react-router-dom";
import { QUERY_ME, QUERY_USER } from "../../utils/queries";
import { UPDATE_THOUGHT, REMOVE_THOUGHT } from "../../utils/mutations";
import "./mythoughts.css";

const MyThoughts = () => {
  const { username: userParam } = useParams();
  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  const myThoughts = data?.me.thoughts || data?.user.thoughts || {};
  const [updatedThought, setUpdatedThought] = useState("");
  const [editingThoughtId, setEditingThoughtId] = useState("");
  const [clearedTextarea, setClearedTextarea] = useState(false);
  const [updateThought, {error}] = useMutation(UPDATE_THOUGHT);
  const [deleteThought, {err}] = useMutation(REMOVE_THOUGHT);

  if (!myThoughts.length) {
    return <h3>No Thoughts Yet</h3>;
  }

  const handleChange = (event) => {
    setUpdatedThought(event.target.value);
    setClearedTextarea(true);
  };

  const handleUpdatingThought = (thoughtId) => {
    setEditingThoughtId(thoughtId);
  };

  const onUpdate = async (thoughtId) => {
    try {
      if (!updatedThought) {
        alert("You must enter thought text!");
        return;
      }  
      // Call the updateThought mutation to update the thought text
      await updateThought({
        variables: { thoughtId: thoughtId, thoughtText: updatedThought },
      });
      setEditingThoughtId(null); // Reset the editingThoughtId state
    } catch (err) {
      console.error(err);
    }
  };

  const handleCancel = () => {
    window.location.reload();
  };

  const onDelete = async (thoughtId) => {
    try {
      if (window.confirm("Are you sure you want to delete this thought?")) {
        await deleteThought({
            variables: { thoughtId: thoughtId },
          });
          // Refresh the page or update the thought list after deletion
          window.location.reload();
      } 
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="mythought-list-container">
        {myThoughts &&
          myThoughts.map((thought) => (
            <div key={thought._id} className="col-12 col-md-4 mb-3 p-2">
              <div className="card mycard h-100 d-flex flex-column p-2">
                <h4 className="mycard-header text-light p-2 m-0">
                  <>
                    <span style={{ fontSize: "1rem" }}>
                      {thought.createdAt}
                    </span>
                  </>
                </h4>
                <div className="card-body bg-light p-2">
                  {editingThoughtId !== null &&
                  editingThoughtId === thought._id ? (
                    <div>
                      <textarea
                        type="text"
                        value={
                          clearedTextarea ? updatedThought : thought.thoughtText
                        }
                        onChange={handleChange}
                        rows={5}
                      />
                      <div>
                        <button
                          className="btn btn-primary btn-block btn-squared m-1"
                          onClick={() => onUpdate(thought._id)}
                        >
                          Save
                        </button>
                        <button
                          className="btn btn-primary btn-block btn-squared m-1"
                          onClick={() => handleCancel()}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <p>{thought.thoughtText}</p>
                  )}
                </div>
                <div className="button-container d-flex justify-content-center">
                {editingThoughtId !== thought._id && (
                  <div className="button-wrapper">
                  <button
                    className="btn btn-primary btn-block btn-squared mb-1"
                    onClick={() => handleUpdatingThought(thought._id)}
                  >
                    Update
                  </button>
                  </div>
                )}
                <div className="button-wrapper">
                <button
                  className="btn btn-primary btn-block btn-squared"
                  onClick={() => onDelete(thought._id)}
                >
                  Delete
                </button>
                </div>
                </div>
              </div>
            </div>
          ))}
      {error && (
          <div className="mycard col-12 my-3 bg-danger text-white p-3">
            Something went wrong...
          </div>
        )}
         {err && (
          <div className="mycard col-12 my-3 bg-danger text-white p-3">
            Something went wrong...
          </div>
        )}
    </div>
  );
};

export default MyThoughts;
