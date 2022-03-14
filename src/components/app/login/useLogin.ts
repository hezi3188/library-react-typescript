import { useDispatch } from 'react-redux';

import { UseLoginInput, UseLoginOutput } from './useLoginInterfaces';
import { login } from '../../../redux/auth';

const useAddTodo = (props: UseLoginInput): UseLoginOutput => {
  const { readers } = props;
  const dispatch = useDispatch();
  const getUser = (selectedReader: number) =>
    readers.filter((item) => item?.id === selectedReader)[0];

  const loginUser = (selectedReader: number) => {
    dispatch(login(getUser(selectedReader)));
  };

  return {
    loginUser: loginUser,
  };
};
export default useAddTodo;
