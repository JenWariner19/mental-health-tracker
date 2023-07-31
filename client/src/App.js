import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import Navbar from './components/navbar/navbar'
import Footer from './components/footer/footer'

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
     < Navbar />
      <Router>
        <div className="flex-column justify-center align-center min-100-vh bg-primary">
          <Routes>
          <Route 
              
            />
          </Routes>
        </div>
      </Router>
      < Footer />
    </ApolloProvider>
  );
}

export default App;