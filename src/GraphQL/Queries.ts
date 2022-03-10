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
  query MyQuery($id: Int!) {
    bookById(id: $id) {
      id
      name
    }
  }
`;

export const GET_BOOKS_OF_USER = gql`
  query MyQuery($equalTo: Int) {
    allBooksLists(filter: { readerId: { equalTo: $equalTo } }) {
      nodes {
        bookByBookId {
          name
          id
        }
      }
    }
  }
`;
export const SELECT_FAVORITE_BOOK = gql`
  mutation selectFavoriteDb($favoriteBook: Int = null, $id: Int!) {
    updateReaderById(
      input: { readerPatch: { favoriteBook: $favoriteBook }, id: $id }
    ) {
      bookByFavoriteBook {
        id
        name
        authorId
      }
    }
  }
`;
export const ADD_BOOK_TO_USER = gql`
  mutation MyMutation($bookId: Int!, $readerId: Int!) {
    createBooksList(
      input: { booksList: { readerId: $readerId, bookId: $bookId } }
    ) {
      bookByBookId {
        id
        name
        authorByAuthorId {
          id
        }
      }
    }
  }
`;
export const ALL_BOOKS_DONT_READ_OF_USER = gql`
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
