import { useMutation } from '@apollo/client';

import {
  UseEditBookDialogIncome,
  UseEditBookDialogOutcome,
} from './useEditBookDialogInterfaces';
import { UPDATE_BOOK } from '../../../../../../GraphQL/book/Mutation';

const useEditBookDialog = (
  props: UseEditBookDialogIncome
): UseEditBookDialogOutcome => {
  const { handleClose } = props;
  const [editBookDb] = useMutation(UPDATE_BOOK);

  const editBook = (id: number, name: string) => {
    editBookDb({
      variables: {
        id,
        name,
      },
    }).then(() => {
      handleClose();
    });
  };

  return {
    editBook,
  };
};
export default useEditBookDialog;
