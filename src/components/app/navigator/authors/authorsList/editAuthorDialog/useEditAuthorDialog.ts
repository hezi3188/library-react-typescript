import { useMutation } from '@apollo/client';

import {
  UseEditAuthorDialogIncome,
  UseEditAuthorDialogOutcome,
} from './useEditAuthorDialogInterfaces';
import { EDIT_AUTHOR } from '../../../../../../GraphQL/author/Mutation';

const useAddBookDialog = (
  props: UseEditAuthorDialogIncome
): UseEditAuthorDialogOutcome => {
  const { handleClose } = props;
  const [editAuthorDb] = useMutation(EDIT_AUTHOR);

  const editAuthor = (
    firstName: string,
    lastName: string,
    authorId: number
  ) => {
    editAuthorDb({
      variables: {
        id: authorId,
        firstName,
        lastName,
      },
    }).then(() => {
      handleClose();
    });
  };

  return {
    editAuthor,
  };
};
export default useAddBookDialog;
