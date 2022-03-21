import { useDispatch } from 'react-redux';

import { UseLoginInput, UseLoginOutput } from './useLoginInterfaces';
import { login } from '../../../../redux/auth';

const useAddTodo = (props: UseLoginInput): UseLoginOutput => {
  const { readers } = props;
  const dispatch = useDispatch();
  const getUser = (id: number) => readers.find((item) => item?.id === id)!;

  const loginUser = (id: number) => {
    dispatch(login(getUser(id)));
  };

  return {
    loginUser,
  };
};
export default useAddTodo;
