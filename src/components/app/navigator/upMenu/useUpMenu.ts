import { useDispatch } from 'react-redux';
import { useMutation } from '@apollo/client';
import { useSelector } from 'react-redux';

import { logOut } from '../../../../redux/auth';
import { RootState } from '../../../../redux/store';
import { DELETE_READER } from '../../../../GraphQL/Queries';
import { UseLoginInput, UseLoginOutput } from './useUpMenuInterfaces';
import Reader from '../../../../models/reader';

const useAddTodo = (props: UseLoginInput): UseLoginOutput => {
  const dispatch = useDispatch();
  const [deleteReader] = useMutation(DELETE_READER);
  const loginUser = useSelector<RootState, Reader>(
    (state) => state.auth.loginUser
  );
  const deleteAccount = () => {
    deleteReader({ variables: { id: loginUser?.id } });
    logout();
  };

  const logout = () => {
    dispatch(logOut());
  };

  return {
    deleteAccount: deleteAccount,
    logout: logout,
  };
};
export default useAddTodo;
