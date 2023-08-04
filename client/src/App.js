import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";


import Navbar from './components/navbar/navbar';
import Footer from './components/footer/footer';
import MyJournalEntries from './pages/myJournal/MyJournal';
import Home from "./pages/Home";
import SingleThought from "./pages/SingleThought";
import MyDaily from "./pages/myDaily/MyDaily";
import Resources from "./pages/Resources";



const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="flex-column justify-center align-center min-100-vh bg-primary">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/myJournal" element={<MyJournalEntries />} />
            <Route path="/thoughts/:thoughtId" element={<SingleThought />}/>
            <Route path="/myDaily" element={<MyDaily />} />
            <Route path="/Resources" element={<Resources />} />
          </Routes>
        </div>
      </Router>
      <Footer />
    </ApolloProvider>
  );
}

export default App;
