import { useMutation } from '@apollo/client';
import { useSelector, useDispatch } from 'react-redux';

import { DELETE_BOOK_TO_USER } from '../../../../../GraphQL/Queries';
import { EDIT_READER } from '../../../../../GraphQL/Queries';
import { RootState } from '../../../../../redux/store';
import Reader from '../../../../../models/reader';
import { editReader } from '../../../../../redux/auth';
import Book from '../../../../../models/book';
import {
  UseBooksListOfReaderOutput,
  UseBooksListOfReaderInput,
} from './UseBooksListOfReaderInterfaces';

const useBooksListOfReader = (
  props: UseBooksListOfReaderInput
): UseBooksListOfReaderOutput => {
  const { books, setBooks, setOpenMessage, setMessage } = props;
  const dispatch = useDispatch();
  const [selectFavoriteDb] = useMutation(EDIT_READER);
  const loginUser = useSelector<RootState, Reader>(
    (state) => state.auth.loginUser
  );

  const [deleteBookToUser] = useMutation(DELETE_BOOK_TO_USER);

  const selectFavoriteHandle = (favoriteBook: Book | undefined) => {
    selectFavoriteDb({
      variables: {
        favoriteBook: favoriteBook ? favoriteBook.id : null,
        id: loginUser?.id,
      },
    }).then((data) => {
      dispatch(editReader(data.data.updateReaderById.reader));
    });
  };

  const deleteBook = (id: number) => {
    deleteBookToUser({
      variables: { readerId: loginUser?.id, bookId: id },
    }).then(() => {
      if (loginUser?.favoriteBook?.id === id) {
        let copyState: Reader = {
          id: loginUser?.id,
          lastName: loginUser?.lastName,
          firstName: loginUser?.firstName,
          favoriteBook: undefined,
        };
        dispatch(editReader(copyState));
      }
      setBooks(books.filter((book: Book) => book?.id !== id));
    });
  };

  const addBookToUser = (book: Book) => {
    setOpenMessage(true);
    setBooks([...books, book]);
    setMessage(
      'הספר ' +
        book?.name +
        ' נוסף בהצלחה ל' +
        loginUser?.firstName +
        ' ' +
        loginUser?.lastName
    );
  };

  return {
    selectFavorite: selectFavoriteHandle,
    deleteBook: deleteBook,
    addBookToUser: addBookToUser,
  };
};
export default useBooksListOfReader;
