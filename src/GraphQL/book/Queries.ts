import { gql } from '@apollo/client';

export const GET_BOOKS = gql`
  query GetBooks {
    allBooks {
      nodes {
        name
        id
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
  query MyQuery($equalTo: Int) {
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