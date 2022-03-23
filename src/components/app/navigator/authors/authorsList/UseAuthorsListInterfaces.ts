import { Author } from '../../../../../models/author';

export interface UseAuthorListIncome {
  authors: Author[];
  setAuthors: (author: Author[]) => void;
}
export interface UseAuthorsListOutcome {
  deleteAuthor: (id: number) => void;
}
