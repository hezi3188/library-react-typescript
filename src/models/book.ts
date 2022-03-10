export interface BookModel {
  name: string;
  id: number;
  authorId: number;
}

type Book = BookModel | undefined;

export default Book;
