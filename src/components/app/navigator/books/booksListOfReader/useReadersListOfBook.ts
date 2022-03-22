import { useMutation } from '@apollo/client';
import { useSelector } from 'react-redux';

import { DELETE_BOOKS_LIST } from '../../../../../GraphQL/booksList/Mutation';
import { RootState } from '../../../../../redux/store';
import Reader from '../../../../../models/reader';
import {
  UseReadersListOfBookOutcome,
  UseReadersListOfBookIncome,
} from './UseReadersListOfBookInterfaces';


const useBooksListOfReader = (
  props: UseReadersListOfBookIncome
): UseReadersListOfBookOutcome => {
  const { readers, setReaders } = props;
  const loginUser = useSelector<RootState, Reader>(
    (state) => state.auth.loginUser
  );

  const [deleteBookToUser] = useMutation(DELETE_BOOKS_LIST);

  const deleteReader = (id: number) => {
    deleteBookToUser({
      variables: { readerId: loginUser?.id, bookId: id },
    }).then(() => {
      setReaders(
        readers.filter((reader: Reader) => reader?.id !== loginUser?.id)
      );
    });
  };

  return {
    deleteReader,
  };
};
export default useBooksListOfReader;
