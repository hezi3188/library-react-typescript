import { useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';

import Book from '../../../../../models/book';
import Reader from '../../../../../models/reader';
import { ALL_READERS_OF_BOOK } from '../../../../../GraphQL/booksList/Queries';
import { useStyles } from './readersListOfBookStyles';
import Container from '../../../../../comons/container/container';
import useBooksListOfReader from './useReadersListOfBook';
import ConfirmDialog from '../../../../../comons/confirmDialog/confirmDialog';
import { ERROR_DB } from '../../../../../utils/strings';
import ReaderCard from './card/card';

const DELETE_DIALOG_TITLE: string = 'זהירות!';
const DELETE_DIALOG_MESSAGE: string = 'האם אתה בטוח שברצונך למחוק?';
const BOOKS_OF_TITLE: string = ' הקוראים של ';

interface Props {
  bookData?: Book;
}

const ReadersListOfBook: React.FC<Props> = (props) => {
  const classes = useStyles();
  const { bookData } = props;

  const { loading, error, data } = useQuery(ALL_READERS_OF_BOOK, {
    fetchPolicy: 'network-only',
    variables: { equalTo: bookData?.id },
  });

  const [readers, setReaders] = useState<Reader[]>([]);
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);

  const { deleteReader } = useBooksListOfReader({
    readers,
    setReaders,
  });

  useEffect(() => {
    if (data) {
      setReaders(
        data.allBooksLists.nodes.map((book: any) => book.readerByReaderId)
      );
    }
  }, [data]);

  if (loading) {
    return <CircularProgress />;
  }
  if (error && bookData) {
    return <h1>{ERROR_DB}</h1>;
  }

  const handleDelete = (id: number) => {
    setOpenDeleteDialog(true);
  };

  return (
    <div className={classes.root}>
      <ConfirmDialog
        open={openDeleteDialog}
        title={DELETE_DIALOG_TITLE}
        message={DELETE_DIALOG_MESSAGE}
        onClose={() => setOpenDeleteDialog(false)}
        onConfirm={() => deleteReader(bookData?.id as number)}
      />
      <Container>
        {bookData && (
          <div className={classes.upContainer}>
            <Typography style={{ fontSize: '4vh' }} variant='h6'>
              {BOOKS_OF_TITLE}
              <strong>{` ${bookData.name} :`}</strong>
            </Typography>
          </div>
        )}
        {readers.map((val: Reader) => {
          if (val) {
            return (
              <ReaderCard
                reader={val}
                handleDelete={() => handleDelete(val.id)}
              />
            );
          }
        })}
      </Container>
    </div>
  );
};

export default ReadersListOfBook;
