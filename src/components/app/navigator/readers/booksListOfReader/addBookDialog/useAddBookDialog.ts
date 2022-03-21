import { useMutation } from '@apollo/client';
import { useSelector } from 'react-redux';

import Book from '../../../../../../models/book';
import Reader from '../../../../../../models/reader';
import { RootState } from '../../../../../../redux/store';
import {
  UseAddBookDialogInput,
  UseAddBookDialogOutput,
} from './useAddBookDialogInterfaces';
import { ADD_BOOKS_LIST } from '../../../../../../GraphQL/booksList/Mutation';

const useAddBookDialog = (
  props: UseAddBookDialogInput
): UseAddBookDialogOutput => {
  const { handleClose, addBookToUser } = props;
  const [addBookToUserDb] = useMutation(ADD_BOOKS_LIST);
  const loginUser = useSelector<RootState, Reader>(
    (state) => state.auth.loginUser
  );

  const addBook = (bookId: number) => {
    addBookToUserDb({
      variables: { bookId: bookId, readerId: loginUser?.id },
    }).then((obj) => {
      handleClose();
      let newObj: Book = obj.data.createBooksList.bookByBookId;
      addBookToUser(newObj);
    });
  };

  return {
    addBook,
  };
};
export default useAddBookDialog;
