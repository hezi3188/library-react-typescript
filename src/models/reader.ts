interface ReaderModel {
  lastName: string;
  id: number;
  firstName: string;
  favoriteBook: number;
}

type Reader = ReaderModel | undefined;
export default Reader;
