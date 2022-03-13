import { useMutation } from '@apollo/client';
import { useSelector, useDispatch } from 'react-redux';
import Reader from '../../../../../../models/reader';
import { RootState } from '../../../../../../redux/store';
import { editReader as editReaderRdx } from '../../../../../../redux/auth';

import {
  UseAddBookDialogInput,
  UseAddBookDialogOutput,
} from './useEditReaderDialogInterfaces';
import { EDIT_READER } from '../../../../../../GraphQL/Queries';

const useAddBookDialog = (
  props: UseAddBookDialogInput
): UseAddBookDialogOutput => {
  const { handleClose } = props;
  const [editReaderDb] = useMutation(EDIT_READER);
  const dispatch = useDispatch();
  const loginUser = useSelector<RootState, Reader>(
    (state) => state.auth.loginUser
  );

  const editReader = (
    firstName: string,
    lastName: string,
    readerId: number
  ) => {
    editReaderDb({
      variables: {
        id: readerId,
        firstName: firstName,
        lastName: lastName,
      },
    }).then((obj) => {
      handleClose();
      if (loginUser?.id === readerId) {
        let copyState: Reader = {
          id: loginUser?.id,
          lastName: lastName,
          firstName: firstName,
          favoriteBook: loginUser?.favoriteBook,
        };
        dispatch(editReaderRdx(copyState));
      }
    });
  };

  return {
    editReader: editReader,
  };
};
export default useAddBookDialog;
