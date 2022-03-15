import { gql } from '@apollo/client';

export const LOAD_AUTHORS = gql`
  query LoadAuthors {
    allAuthors {
      nodes {
        firstName
        id
        lastName
      }
    }
  }
`;


