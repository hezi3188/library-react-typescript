import { Author } from "./author";
export interface BookModel {
  name: string;
  id: number;
  author: Author;
}

type Book = BookModel | undefined;

export default Book;
