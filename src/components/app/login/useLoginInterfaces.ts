import Reader from '../../../models/reader';

export interface UseLoginInput {
  readers: Reader[];
}
export interface UseLoginOutput {
  loginUser: (id: number) => void;
}
