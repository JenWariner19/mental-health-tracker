const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    thoughts: [Thought]
    journalEntries: [JournalEntry]

  }

  type Thought {
    _id: ID
    thoughtText: String
    thoughtAuthor: String
    createdAt: String
    comments: [Comment]!
  }

  type Comment {
    _id: ID
    commentText: String
    commentAuthor: String
    createdAt: String
  }

  type JournalEntry {
    _id: ID
    date: String!
    mood: String!
    checkList: CheckList
    waterIntake: Int
    gratefuls: String
    sleep: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type CheckList {
    workout: Boolean
    sunlight: Boolean
    supplements: Boolean
    selfCare: Boolean
  }

  input CheckListInput {
    workout: Boolean
    sunlight: Boolean
    supplements: Boolean
    selfCare: Boolean
  }

  type Query {
    users: [User]
    user(username: String!): User
    thoughts: [Thought]
    thought(thoughtId: ID!): Thought
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addThought(thoughtText: String!): Thought
    addComment(thoughtId: ID!, commentText: String!): Thought
    addJournalEntry(
      mood: String!,
      toDoList: String,
      morningRoutine: String,
      waterIntake: Int,
      gratefuls: String,
      sleep: String
    ): User
    updateThought(thoughtId: ID!, thoughtText: String!): Thought
    updateJournalEntry(
      journalEntryId: ID!,
      mood: String!,
      toDoList: String,
      morningRoutine: String,
      waterIntake: Int,
      gratefuls: String,
      sleep: String
    ) : User
    removeThought(thoughtId: ID!): Thought
    removeComment(thoughtId: ID!, commentId: ID!): Thought
    removeJournalEntry(journalEntryId: ID!): User
  }
`;

module.exports = typeDefs;
