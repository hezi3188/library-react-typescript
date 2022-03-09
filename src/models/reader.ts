interface ReaderModel {
  lastName: string;
  id: number;
  firstName: string;
  favoriteBook: number | undefined;
}

type Reader = ReaderModel | undefined;
export default Reader;
