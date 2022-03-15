import { gql } from '@apollo/client';

export const ADD_BOOKS_LIST = gql`
  mutation AddBooksList($bookId: Int!, $readerId: Int!) {
    createBooksList(
      input: { booksList: { readerId: $readerId, bookId: $bookId } }
    ) {
      bookByBookId {
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
`;
export const DELETE_BOOKS_LIST = gql`
  mutation DeleteBooksList($bookId: Int!, $readerId: Int!) {
    deleteBooksListByReaderIdAndBookId(
      input: { readerId: $readerId, bookId: $bookId }
    ) {
      booksList {
        bookId
      }
    }
  }
`;
