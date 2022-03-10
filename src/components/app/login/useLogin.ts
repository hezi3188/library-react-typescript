import { useLazyQuery } from '@apollo/client';
import { useDispatch } from 'react-redux';

import { UseLoginInput, UseLoginOutput } from './useLoginInterfaces';
import { login, selectFavorite } from '../../../redux/auth';
import { GET_BOOK } from '../../../GraphQL/Queries';

const useAddTodo = (props: UseLoginInput): UseLoginOutput => {
  const { readers } = props;
  const dispatch = useDispatch();
  const getUser = (selectedReader: number) =>
    readers.filter((item) => item?.id === selectedReader)[0];
  const [getBook] = useLazyQuery(GET_BOOK, {
    fetchPolicy: 'network-only',
    nextFetchPolicy: 'network-only',
  });

  const loginUser = (selectedReader: number) => {
    dispatch(login(getUser(selectedReader)));
    getBook({ variables: { id: getUser(selectedReader)?.favoriteBook } }).then(
      (item) => {
        dispatch(selectFavorite(item.data.bookById));
      }
    );
  };

  return {
    loginUser: loginUser,
  };
};
export default useAddTodo;
