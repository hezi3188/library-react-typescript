import { useMutation } from '@apollo/client';
import { useSelector, useDispatch } from 'react-redux';

import { SELECT_FAVORITE_BOOK } from '../../../../../GraphQL/Queries';
import { RootState } from '../../../../../redux/store';
import Reader from '../../../../../models/reader';
import { selectFavorite } from '../../../../../redux/auth';
import Book from '../../../../../models/book';
import {
  UseBooksListOfReaderOutput,
  UseBooksListOfReaderInput,
} from './UseBooksListOfReaderInterfaces';

const useBooksListOfReader = (
  props: UseBooksListOfReaderInput
): UseBooksListOfReaderOutput => {
  const { books } = props;
  const dispatch = useDispatch();
  const [selectFavoriteDb] = useMutation(SELECT_FAVORITE_BOOK);
  const loginUser = useSelector<RootState, Reader>(
    (state) => state.auth.loginUser
  );
  
  const selectFavoriteHandle = (favoriteId: number | undefined) => {
    selectFavoriteDb({
      variables: { favoriteBook: favoriteId, id: loginUser?.id },
    }).then(() => {
      dispatch(
        selectFavorite(books.filter((book: Book) => book?.id === favoriteId)[0])
      );
    });
  };

  return {
    selectFavorite: selectFavoriteHandle,
  };
};
export default useBooksListOfReader;
