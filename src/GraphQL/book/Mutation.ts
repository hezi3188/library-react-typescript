import { gql } from '@apollo/client';

export const DELETE_BOOK = gql`
  mutation DeleteBook($id: Int!) {
    deleteBookById(input: { id: $id }) {
      book {
        id
      }
    }
  }
`;

export const UPDATE_BOOK = gql`
  mutation UpdateBook($id: Int!, $name: String, $authorId: Int) {
    updateBookById(
      input: { bookPatch: { name: $name, authorId: $authorId }, id: $id }
    ) {
      book {
        id
        name
        author: authorByAuthorId {
          firstName
          id
          lastName
        }
      }
    }
  }
`;
