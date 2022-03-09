export interface BookModel {
  name: string;
  id: number;
}

type Book = BookModel | undefined;

export default Book;
