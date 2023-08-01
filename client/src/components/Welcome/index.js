import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_USER, QUERY_ME } from "../../utils/queries";
import Auth from "../../utils/auth";

const WelcomeMessage = () => {
  const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  const user = data?.me || data?.user || {};

  if (Auth.loggedIn() && Auth.getProfile().username === userParam) {
    return (
      <div>
        <h2>{`Welcome ${user.username}!`}</h2>
        <p>Site instructions after logging in go here.</p>
      </div>
    );
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.username) {
    return (
      <div>
        <h2>Welcome to Mindful Memiors!</h2>
        <p>Site instructions before logging in go here.</p>
      </div>
    );
  }

  return null;
};

export default WelcomeMessage;
