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
          <img src="./mental-logo.png" alt="lightbulb" />
        </div>
        <div className="text-block">
          <h2 className="header">{`Welcome ${user.username}!`}</h2>
          <p className="text">We're thrilled to see you here, and we want to make sure you make the most of your experience on our mental health platform. This is your safe haven to express yourself openly. Share your thoughts, connect with others, and track your daily routine for personal growth. Explore our valuable mental health resources whenever you need support. This platform is yours to explore and find solace in, knowing that you're not alone on your journey to well-being. Embrace the support of this caring community and remember that every step forward is a testament to your resilience and strength. Together, we can create a space of understanding and empathy where we can all thrive.</p>
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
          <h2 className="header">Welcome to Mindfulness Memoir!</h2>
          <p className="text">Welcome to our inclusive and compassionate mental health platform! We are dedicated to providing a safe and supportive space for individuals to share their thoughts, feelings, and experiences freely. Our platform allows you to maintain a daily routine journal, offering a valuable tool for self-reflection and personal growth. Moreover, we understand the importance of access to mental health resources, which is why our site provides a comprehensive library of resources readily available for you to explore. Whether you're seeking professional guidance, coping strategies, or simply want to learn more about mental health, our collection of curated resources is here to support you on your journey to well-being. Embrace this community of understanding and empathy as we navigate the path to wellness together. Remember, you are not alone – we are here for you every step of the way.</p>
        </div>
      </div>
    );
  }

  return null;
};

export default WelcomeMessage;
