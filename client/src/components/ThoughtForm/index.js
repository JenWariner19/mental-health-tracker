import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import './thoughtform.css';

import { ADD_THOUGHT } from "../../utils/mutations";

const ThoughtForm = () => {
  const [formState, setFormState] = useState({
    thoughtText: "",
  });

  const [addThought, { error }] = useMutation(ADD_THOUGHT);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      if (!formState.thoughtText) {
        alert("You must enter thought text!");
        return;
      }
      const { data } = addThought({
        variables: { ...formState },
      });

      window.location.reload();
      setFormState({
        thoughtText: "",
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "thoughtText") {
      setFormState({ ...formState, [name]: value });
    } else if (name !== "thoughtText") {
      setFormState({ ...formState, [name]: value });
    }
  };

  return (
    <div className="card w-75">
      <h3 className="card-header text-light p-2 m-0">
      Unlock the Power of Your Mind: Share Your Thoughts Now!
      </h3>
      <form
        className="flex-row justify-center justify-space-between-md align-center"
        onSubmit={handleFormSubmit}
      >
        <div className="col-12 card-body p-2">
          <textarea
            name="thoughtText"
            placeholder="Here's a new thought..."
            value={formState.thoughtText}
            className="form-input w-100"
            onChange={handleChange}
            rows={4}
          ></textarea>
        </div>
        <div>
          <button
            className="btn btn-primary btn-block btn-squared w-100"
            type="submit"
          >
            Add Thought
          </button>
        </div>
        {error && (
          <div className="col-12 my-3 bg-danger text-white p-3">
            Something went wrong...
          </div>
        )}
      </form>
    </div>
  );
};

export default ThoughtForm;
