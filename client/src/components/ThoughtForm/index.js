import React, { useState } from "react";
import { useMutation } from "@apollo/client";

import { ADD_THOUGHT } from "../../utils/mutations";

const ThoughtForm = () => {
  const [formState, setFormState] = useState({
    thoughtText: "",
  });

  // Set up our mutation with an option to handle errors
  const [addThought, { error }] = useMutation(ADD_THOUGHT);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // On form submit, perform mutation and pass in form data object as arguments
    // It is important that the object fields are match the defined parameters in `ADD_THOUGHT` mutation
    try {
      if (!formState.thoughtText) {
        alert("You must enter thought text!");
        return;
      }
      const { data } = addThought({
        variables: { ...formState },
      });

      window.location.reload();
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
        Create a new thought...
      </h3>
      <form
        className="flex-row justify-center justify-space-between-md align-center"
        onSubmit={handleFormSubmit}
      >
        <div className="col-12 card-body bg-light p-2">
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
