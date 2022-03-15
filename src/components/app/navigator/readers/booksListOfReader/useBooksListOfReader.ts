import { useMutation } from '@apollo/client';
import { useSelector, useDispatch } from 'react-redux';

import { DELETE_BOOKS_LIST } from '../../../../../GraphQL/booksList/Mutation';
import { EDIT_READER } from '../../../../../GraphQL/reader/Mutation';
import { RootState } from '../../../../../redux/store';
import Reader from '../../../../../models/reader';
import { editReader } from '../../../../../redux/auth';
import Book from '../../../../../models/book';
import {
  UseBooksListOfReaderOutput,
  UseBooksListOfReaderInput,
} from './UseBooksListOfReaderInterfaces';

const BOOK_TITLE = 'הספר ';
const ADD_BOOK_TITLE = 'נוסף בהצלחה ל';

const useBooksListOfReader = (
  props: UseBooksListOfReaderInput
): UseBooksListOfReaderOutput => {
  const { books, setBooks, setOpenMessage, setMessage } = props;
  const dispatch = useDispatch();
  const [selectFavoriteDb] = useMutation(EDIT_READER);
  const loginUser = useSelector<RootState, Reader>(
    (state) => state.auth.loginUser
  );

  const [deleteBookToUser] = useMutation(DELETE_BOOKS_LIST);

  const handleSelectFavorite = (favoriteBook: Book | undefined) => {
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
          ...loginUser,
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
      `${BOOK_TITLE} ${book?.name}  ${ADD_BOOK_TITLE}${loginUser?.firstName} ${loginUser?.lastName}`
    );
  };

  return {
    selectFavorite: handleSelectFavorite,
    deleteBook: deleteBook,
    addBookToUser: addBookToUser,
  };
};
export default useBooksListOfReader;
