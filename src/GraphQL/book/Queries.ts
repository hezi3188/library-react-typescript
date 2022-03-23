import { gql } from '@apollo/client';

export const GET_BOOKS = gql`
  query GetBooks {
    allBooks {
      nodes {
        name
        id
        author: authorByAuthorId {
          firstName
          id
          lastName
        }
      }
    }
  }
`;

export const GET_BOOK = gql`
  query GetBook($id: Int!) {
    bookById(id: $id) {
      id
      name
    }
  }
`;

export const GET_BOOKS_DONT_READ_OF_READER = gql`
  query GetBooksDontReadOfReader($equalTo: Int) {
    allBooks(
      filter: {
        booksListsByBookId: {
          every: { not: { readerByReaderId: { id: { equalTo: $equalTo } } } }
        }
      }
    ) {
      nodes {
        name
        id
        authorId
      }
    }
  }
`;
export const GET_BOOKS_OF_AUTHOR = gql`
  query GetBooksOfAuthor($equalTo: Int) {
    allBooks(filter: { authorId: { equalTo: $equalTo } }) {
      nodes {
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
