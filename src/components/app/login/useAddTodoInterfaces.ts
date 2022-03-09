import Reader from '../../../models/reader';

export interface UseLoginInput {
  readers: Reader[];
}
export interface UseLoginOutput {
  loginUser: (selectedReader: number) => void;
}
