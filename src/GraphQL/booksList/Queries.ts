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
