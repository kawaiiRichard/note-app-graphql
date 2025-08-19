import { gql } from "@apollo/client";

export const CREATE_NOTE = gql`
  mutation CreateNote(
    $user_id: ID!
    $title: String!
    $description: String!
    $created_at: Date!
  ) {
    createNote(
      user_id: $user_id
      title: $title
      description: $description
      created_at: $created_at
    ) {
      title
      description
      user_id
      created_at
    }
  }
`;

export const DELETE_NOTE = gql`
  mutation DeleteNote($id: ID!) {
    deleteNote(id: $id) {
      id
    }
  }
`;

export const UPDATE_NOTE = gql`
  mutation UpdateNote($id: ID!, $title: String, $description: String) {
    updateNote(id: $id, title: $title, description: $description) {
      id
      title
      description
    }
  }
`;
