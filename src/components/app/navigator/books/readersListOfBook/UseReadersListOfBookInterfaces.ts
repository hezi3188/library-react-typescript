import Reader from '../../../../../models/reader';

export interface UseReadersListOfBookIncome {
  readers: Reader[];
  setReaders: (readers: Reader[]) => void;
}
export interface UseReadersListOfBookOutcome {
  deleteReader: (id: number) => void;
}
