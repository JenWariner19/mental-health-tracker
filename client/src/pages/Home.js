import React from 'react';
import { useQuery } from '@apollo/client';

import ThoughtList from '../components/ThoughtList';
import WelcomeMessage from '../components/Welcome';

import { QUERY_THOUGHTS } from '../utils/queries';

const homepage = {
  backgroundColor: 'white'
};

const Home = () => {
  const { loading, data } = useQuery(QUERY_THOUGHTS);
  const thoughts = data?.thoughts || [];

  return (
    <main>
      <div style={homepage}>
        <div>
            <WelcomeMessage />
        </div>
        <div>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <ThoughtList
              thoughts={thoughts}
              title="News Feed"
            />
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
