import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_THOUGHT = gql`
mutation addThought($thoughtText: String!) {
  addThought(thoughtText: $thoughtText) {
    _id
    thoughtText
    thoughtAuthor
    createdAt
    comments {
      _id
      commentText
    }
  }
}
`;

export const ADD_COMMENT = gql`
mutation addComment($thoughtId: ID!, $commentText: String!) {
  addComment(thoughtId: $thoughtId, commentText: $commentText) {
    _id
    thoughtText
    thoughtAuthor
    createdAt
    comments {
      _id
      commentText
      createdAt
    }
  }
}
`;

export const UPDATE_THOUGHT = gql`
mutation updateThought($thoughtId: ID!, $thoughtText: String!) {
  updateThought(thoughtId: $thoughtId, thoughtText: $thoughtText) {
    _id
    thoughtText
  }
}
`;

export const UPDATE_JOURNAL = gql`
mutation updateJournal($journalEntryId: ID!, $mood: String!, $toDoList: String, $morningRoutine: String, $waterIntake: Int, $gratefuls: String, $sleep: Int, $notes: String) {
  updateJournalEntry(journalEntryId: $journalEntryId, mood: $mood, toDoList: $toDoList, morningRoutine: $morningRoutine, waterIntake: $waterIntake, gratefuls: $gratefuls, sleep: $sleep, notes: $notes) {
    _id
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

export const REMOVE_THOUGHT = gql`
mutation removeThought($thoughtId: ID!) {
  removeThought(thoughtId: $thoughtId) {
    _id
    thoughtText
    thoughtAuthor
  }
}
`;

export const REMOVE_COMMENT = gql`
mutation removeComment($commentId: ID!, $thoughtId: ID!) {
  removeComment(commentId: $commentId, thoughtId: $thoughtId) {
    comments {
      _id
      commentText
    }
  }
}
`;

export const REMOVE_JOURNAL = gql`
mutation removeJournal($journalEntryId: ID!) {
  removeJournalEntry(journalEntryId: $journalEntryId) {
    _id
    username
    email
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


