import React from 'react';
import { Link } from 'react-router-dom';
import './thoughtlist.css';

const ThoughtList = ({
  thoughts,
  title,
  showTitle = true,
  showUsername = true,
}) => {
  if (!thoughts.length) {
    return <h3>No Thoughts Yet</h3>;
  }

  return (
    <div className="thought-list-container">
      {showTitle && <h3>{title}</h3>}
      <div className="row">
      {thoughts &&
        thoughts.map((thought) => (
          <div key={thought._id} className="col-md-4 mb-3">
            <div className="card h-100">
            <h4 className="card-header text-light p-2 m-0">
              {showUsername ? (
                <Link
                  className="text-light"
                  to={`/profiles/${thought.thoughtAuthor}`}
                >
                  {thought.thoughtAuthor} <br />
                  <span style={{ fontSize: '1rem' }}>
                    {thought.createdAt}
                  </span>
                </Link>
              ) : (
                <>
                  <span style={{ fontSize: '1rem' }}>
                    {thought.createdAt}
                  </span>
                </>
              )}
            </h4>
            <div className="card-body bg-light p-2">
              <p>{thought.thoughtText}</p>
            </div>
            <Link
              className="btn btn-primary btn-block btn-squared"
              to={`/thoughts/${thought._id}`}
            >
              Add Comment
            </Link>
          </div>
          </div>
        ))}
    </div>
    </div>
  );
};

export default ThoughtList;
