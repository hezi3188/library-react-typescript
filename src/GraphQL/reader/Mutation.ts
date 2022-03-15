import { gql } from '@apollo/client';

export const EDIT_READER = gql`
  mutation EditReader(
    $id: Int!
    $firstName: String
    $lastName: String
    $favoriteBook: Int
  ) {
    updateReaderById(
      input: {
        readerPatch: {
          favoriteBook: $favoriteBook
          firstName: $firstName
          lastName: $lastName
        }
        id: $id
      }
    ) {
      reader {
        id
        lastName
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

export const DELETE_READER = gql`
  mutation DeleteReader($id: Int!) {
    deleteReaderById(input: { id: $id }) {
      reader {
        id
      }
    }
  }
`;
