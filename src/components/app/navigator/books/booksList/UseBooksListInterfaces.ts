import Book from '../../../../../models/book';

export interface UseBooksListIncome {
  books: Book[];
  setBooks: (books: Book[]) => void;
}
export interface UseBooksListOutcome {
  deleteBook: (id: number) => void;
}
