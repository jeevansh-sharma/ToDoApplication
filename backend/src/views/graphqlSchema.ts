import { gql } from "apollo-server";

export const typeDefs = gql`
  type User {
    id: ID!
    username: String!
  }

  type Todo {
    id: ID!
    title: String!
    description: String!
    completed: Boolean!
  }

  type Query {
    todos: [Todo!]!
  }

  type Mutation {
    login(username: String!, password: String!): String!
    register(username: String!, password: String!): String!
    createTodo( title: String!, description: String!): Todo!
    completeTodo(id: ID!, completed: Boolean!): Todo!
    editTodo(id: ID!, title: String!, description: String!): Todo!
    deleteTodo(id: ID!): Boolean!
    
  }
`;
