import { useMutation } from '@apollo/client';

import { DELETE_BOOK } from '../../../../../GraphQL/book/Mutation';
import Book from '../../../../../models/book';
import {
  UseBooksListOutcome,
  UseBooksListIncome,
} from './UseBooksListInterfaces';

const useBooksList = (
  props: UseBooksListIncome
): UseBooksListOutcome => {
  const { books, setBooks } = props;

  const [deleteBook] = useMutation(DELETE_BOOK);

  const handleDeleteBook = (id: number) => {
    deleteBook({
      variables: {
        id,
      },
    }).then(() => {
      setBooks(books.filter((item: Book) => item?.id !== id));
    });
  };

  return {
    deleteBook: handleDeleteBook,
  };
};
export default useBooksList;
