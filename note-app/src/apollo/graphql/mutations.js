import { gql } from "@apollo/client";

export const CREATE_NOTE = gql`
  mutation CreateNote($user_id: ID!, $title: String!, $description: String!) {
    createNote(user_id: $user_id, title: $title, description: $description) {
      title
      description
      user_id
    }
  }
`;
