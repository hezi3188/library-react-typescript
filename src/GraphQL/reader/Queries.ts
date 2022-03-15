import { gql } from '@apollo/client';
export const LOAD_READERS = gql`
  query LoadReaders {
    allReaders {
      nodes {
        lastName
        id
        firstName
        favoriteBook: bookByFavoriteBook {
          name
          id
          author: authorByAuthorId {
            firstName
            lastName
            id
          }
        }
      }
    }
  }
`;
