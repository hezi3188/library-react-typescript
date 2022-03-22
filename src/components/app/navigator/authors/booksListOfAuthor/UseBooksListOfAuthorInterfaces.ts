import Book from '../../../../../models/book';

export interface UseBooksListOfReaderInput {
  books: Book[];
  setBooks: (books: Book[]) => void;
  setMessage(str: string): void;
  setOpenMessage(flag: boolean): void;
}
export interface UseBooksListOfReaderOutput {
  selectFavorite: (book: Book | undefined) => void;
  deleteBook: (id: number) => void;
  addBookToUser: (book: Book) => void;
}
