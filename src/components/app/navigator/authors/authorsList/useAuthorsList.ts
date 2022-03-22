import { useMutation } from '@apollo/client';

import { DELETE_READER } from '../../../../../GraphQL/reader/Mutation';
import Reader from '../../../../../models/reader';
import {
  UseBooksListOfReaderOutput,
  UseBooksListOfReaderInput,
} from './UseAuthorsListInterfaces';

const useBooksListOfReader = (
  props: UseBooksListOfReaderInput
): UseBooksListOfReaderOutput => {
  const { readers, setReaders } = props;

  const [deleteReader] = useMutation(DELETE_READER);

  const handleDeleteReader = (id: number) => {
    deleteReader({
      variables: {
        id,
      },
    }).then(() => {
      setReaders(readers.filter((item: Reader) => item?.id !== id));
    });
  };

  return {
    deleteReader: handleDeleteReader,
  };
};
export default useBooksListOfReader;
