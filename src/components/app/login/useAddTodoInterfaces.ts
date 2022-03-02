import Reader from '../../../models/reader';

export interface UseLoginInput {
  readers: Reader[];
  selectedReader: number;
}
export interface UseLoginOutput {
  loginUser: (readers: Reader[]) => void;
}
