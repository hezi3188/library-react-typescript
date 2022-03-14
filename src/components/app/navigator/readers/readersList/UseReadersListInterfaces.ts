import Reader from '../../../../../models/reader';

export interface UseBooksListOfReaderInput {
  readers: Reader[];
  setReaders: (readers: Reader[]) => void;
}
export interface UseBooksListOfReaderOutput {
  deleteReader: (id: number) => void;
}
