import Book from './book';

interface ReaderModel {
  lastName: string;
  id: number;
  firstName: string;
  favoriteBook?: Book;
}

type Reader = ReaderModel | undefined;
export default Reader;
