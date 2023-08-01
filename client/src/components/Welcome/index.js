import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_USER, QUERY_ME } from "../../utils/queries";
import Auth from "../../utils/auth";
import './welcome.css';

const WelcomeMessage = () => {
  const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  const user = data?.me || data?.user || {};

  if (Auth.loggedIn() && Auth.getProfile().username === userParam) {
    return (
      <div className="container">
        <div className="image-block">
          <img src="/mental-health.png" alt="lightbulb" />
        </div>
        <div className="text-block">
          <h2>{`Welcome ${user.username}!`}</h2>
          <p>Site instructions after logging in go here.</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.username) {
    return (
      <div className="container">
        <div className="image-block">
          <img src="./mental-logo.png" alt="lightbulb" />
        </div>
        <div className="text-block">
          <h2>Welcome to Mindfulness Memoir!</h2>
          <p>Site instructions before logging in go here.</p>
        </div>
      </div>
    );
  }

  return null;
};

export default WelcomeMessage;
