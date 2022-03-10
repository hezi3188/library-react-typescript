import Book from '../../../../../models/book';

export interface UseBooksListOfReaderInput {
  books: Book[];
  setBooks: (books: Book[]) => void;
}
export interface UseBooksListOfReaderOutput {
  selectFavorite: (id: number | undefined) => void;
  deleteBook: (id: number) => void;
}
