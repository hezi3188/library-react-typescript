import Book from '../../../../../models/book';

export interface UseBooksListOfReaderInput {
  books: Book[];
}
export interface UseBooksListOfReaderOutput {
  selectFavorite: (id: number | undefined) => void;
}
