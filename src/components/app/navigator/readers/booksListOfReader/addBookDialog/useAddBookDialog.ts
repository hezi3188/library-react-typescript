import { useMutation } from '@apollo/client';
import { useSelector } from 'react-redux';

import Book from '../../../../../../models/book';
import Reader from '../../../../../../models/reader';
import { RootState } from '../../../../../../redux/store';
import {
  UseAddBookDialogInput,
  UseAddBookDialogOutput,
} from './useAddBookDialogInterfaces';
import { ADD_BOOK_TO_USER } from '../../../../../../GraphQL/Queries';

const useAddBookDialog = (
  props: UseAddBookDialogInput
): UseAddBookDialogOutput => {
  const { handleClose, addBookToUser } = props;
  const [addBookToUserDb] = useMutation(ADD_BOOK_TO_USER);
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
    addBook: addBook,
  };
};
export default useAddBookDialog;
