import { useMutation } from '@apollo/client';

import { DELETE_AUTHOR } from '../../../../../GraphQL/author/Mutation';
import { Author } from '../../../../../models/author';
import {
  UseAuthorsListOutcome,
  UseAuthorListIncome,
} from './UseAuthorsListInterfaces';

const useAutherList = (props: UseAuthorListIncome): UseAuthorsListOutcome => {
  const { authors, setAuthors } = props;

  const [deleteAuthor] = useMutation(DELETE_AUTHOR);

  const handleDeleteAuthor = (id: number) => {
    deleteAuthor({
      variables: {
        id,
      },
    }).then(() => {
      setAuthors(authors.filter((item: Author) => item?.id !== id));
    });
  };

  return {
    deleteAuthor: handleDeleteAuthor,
  };
};
export default useAutherList;
