import { gql } from '@apollo/client';

export const DELETE_AUTHOR = gql`
  mutation DeleteAuthor($id: Int!) {
    deleteAuthorById(input: { id: $id }) {
      author {
        id
      }
    }
  }
`;
export const EDIT_AUTHOR = gql`
  mutation EditAuthor($id: Int!, $firstName: String, $lastName: String) {
    updateAuthorById(
      input: {
        authorPatch: { firstName: $firstName, lastName: $lastName }
        id: $id
      }
    ) {
      author {
        id
        firstName
        lastName
      }
    }
  }
`;
