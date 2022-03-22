import { gql } from '@apollo/client';

export const GET_BOOKS_LIST_OF_READER = gql`
  query GetBooksListOfReader($equalTo: Int) {
    allBooksLists(filter: { readerId: { equalTo: $equalTo } }) {
      nodes {
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
  }
`;

export const ALL_READERS_OF_BOOK = gql`
  query AllReadersOfBook($equalTo: Int!) {
    allBooksLists(filter: { bookId: { equalTo: $equalTo } }) {
      nodes {
        readerByReaderId {
          firstName
          id
          lastName
          favoriteBook: bookByFavoriteBook {
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
    }
  }
`;
