// src/graphql/mutations.ts
import { gql } from '@apollo/client';

export const DELETE_TODO_MUTATION = gql`
  mutation DeleteTodo($id: ID!) {
    deleteTodo(id: $id)
  }
`;

export const COMPLETE_TODO_MUTATION = gql`
  mutation CompleteTodo($id: ID!, $completed: Boolean!) {
    completeTodo(id: $id, completed: $completed) {
      id
      completed
    }
  }
`;

export const EDIT_TODO_MUTATION = gql`
  mutation EditTodo($id: ID!, $title: String!, $description: String!) {
    editTodo(id: $id, title: $title, description: $description) {
      id
      title
      description
    }
  }
`;
