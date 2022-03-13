import Book from '../../../../../../models/book';

export interface UseAddBookDialogInput {
  handleClose: () => void;
  addBookToUser: (book: Book) => void;
}
export interface UseAddBookDialogOutput {
  addBook: (bookId: number) => void;
}
