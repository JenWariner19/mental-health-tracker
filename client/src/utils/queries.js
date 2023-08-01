import { gql } from '@apollo/client';

export const QUERY_USER = gql`
query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      thoughts {
        _id
        thoughtText
        createdAt
      }
      journalEntries {
        _id
        date
        mood
        toDoList
        morningRoutine
        waterIntake
        gratefuls
        sleep
        notes
      }
    }
  }
`;

export const QUERY_THOUGHTS = gql`
query getThoughts {
    thoughts {
      _id
      thoughtText
      thoughtAuthor
      createdAt
    }
  }
`;

export const QUERY_SINGLE_THOUGHT = gql`
query getSingleThought($thoughtId: ID!) {
    thought(thoughtId: $thoughtId) {
      _id
      thoughtText
      thoughtAuthor
      createdAt
      comments {
        _id
        commentText
        commentAuthor
        createdAt
      }
    }
  }
`;

export const QUERY_ME = gql`
query ExampleQuery {
    me {
      _id
      username
      email
      thoughts {
        _id
        thoughtText
        thoughtAuthor
        createdAt
      }
      journalEntries {
        _id
        date
        mood
        toDoList
        morningRoutine
        waterIntake
        gratefuls
        sleep
        notes
      }
    }
  }
`;
