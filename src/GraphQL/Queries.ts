import { gql } from '@apollo/client';

export const LOAD_READERS = gql`
  query MyQuery {
    allReaders {
      nodes {
        lastName
        id
        firstName
        favoriteBook
      }
    }
  }
`;
export const LOAD_BOOKS = gql`
  query MyQuery {
    allBooks {
      nodes {
        name
        id
      }
    }
  }
`;

export const LOAD_AUTHORS = gql`
  query MyQuery {
    allAuthors {
      nodes {
        firstName
        id
        lastName
      }
    }
  }
`;

export const GET_BOOK = gql`
  query MyQuery($id: Int = 5) {
    bookById(id: $id) {
      id
      name
    }
  }
`;
