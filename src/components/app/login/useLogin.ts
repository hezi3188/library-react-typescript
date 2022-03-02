import { UseLoginInput, UseLoginOutput } from './useAddTodoInterfaces';
import { useDispatch } from 'react-redux';
import { login } from '../../../redux/auth';

const useAddTodo = (props: UseLoginInput): UseLoginOutput => {
  const { readers, selectedReader } = props;
  const dispatch = useDispatch();

  const loginUser = () => {
    dispatch(
      login(
        readers.filter(
          (item) => item !== undefined && item.id === selectedReader
        )[0]
      )
    );
  };

  return {
    loginUser: loginUser,
  };
};
export default useAddTodo;
