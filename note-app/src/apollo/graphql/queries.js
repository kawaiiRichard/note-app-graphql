import { gql } from "@apollo/client";

export const ALL_NOTES = gql`
  query AllNotes {
    notes: allNotes {
      id
      title
      description
    }
  }
`;
