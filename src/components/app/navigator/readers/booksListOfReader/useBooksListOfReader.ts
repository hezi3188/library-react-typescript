import { useMutation } from '@apollo/client';
import { useSelector, useDispatch } from 'react-redux';

import { DELETE_BOOK_TO_USER } from '../../../../../GraphQL/Queries';
import { SELECT_FAVORITE_BOOK } from '../../../../../GraphQL/Queries';
import { RootState } from '../../../../../redux/store';
import Reader from '../../../../../models/reader';
import { selectFavorite } from '../../../../../redux/auth';
import Book from '../../../../../models/book';
import {
  UseBooksListOfReaderOutput,
  UseBooksListOfReaderInput,
} from './UseBooksListOfReaderInterfaces';

const useBooksListOfReader = (
  props: UseBooksListOfReaderInput
): UseBooksListOfReaderOutput => {
  const { books, setBooks } = props;
  const dispatch = useDispatch();
  const [selectFavoriteDb] = useMutation(SELECT_FAVORITE_BOOK);
  const loginUser = useSelector<RootState, Reader>(
    (state) => state.auth.loginUser
  );
  const favoriteBook = useSelector<RootState, Book>(
    (state) => state.auth.favoriteBook
  );
  const [deleteBookToUser] = useMutation(DELETE_BOOK_TO_USER);

  const selectFavoriteHandle = (favoriteId: number | undefined) => {
    selectFavoriteDb({
      variables: { favoriteBook: favoriteId, id: loginUser?.id },
    }).then(() => {
      dispatch(
        selectFavorite(books.filter((book: Book) => book?.id === favoriteId)[0])
      );
    });
  };

  const deleteBook = (id: number) => {
    deleteBookToUser({
      variables: { readerId: loginUser?.id, bookId: id },
    }).then(() => {
      if (favoriteBook?.id === id) {
        dispatch(selectFavorite(undefined));
      }
      setBooks(books.filter((book: Book) => book?.id !== id));
    });
  };

  return {
    selectFavorite: selectFavoriteHandle,
    deleteBook: deleteBook,
  };
};
export default useBooksListOfReader;
