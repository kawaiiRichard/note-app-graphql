import { gql } from "@apollo/client";

export const ALL_NOTES = gql`
  query AllNotes {
    notes: allNotes {
      id
      title
      description
      date: created_at
      user_id
    }
  }
`;

export const ALL_USERS = gql`
  query AllUsers {
    users: allUsers {
      id
      name
    }
  }
`;

export const USER_NOTES = gql`
  query UserNotes($userId: ID!) {
    notes: allNotes(filter: { user_id: $userId }) {
      id
      title
      description
      date: created_at
      user_id
    }
  }
`;
