import { useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { useSelector } from 'react-redux';
import Typography from '@mui/material/Typography';
import { Alert, Button, Snackbar } from '@mui/material';

import Book from '../../../../../models/book';
import Reader from '../../../../../models/reader';
import { GET_BOOKS_OF_USER } from '../../../../../GraphQL/Queries';
import { RootState } from '../../../../../redux/store';
import { useStyles } from './booksListOfReaderStyles';
import Container from '../../../../../comons/container/container';
import useBooksListOfReader from './useBooksListOfReader';
import AddBookDialog from './addBookDialog/addBookDialog';
import ConfirmDialog from '../../../../../comons/confirmDialog/confirmDialog';
import { ERROR_DB } from '../../../../../utils/strings';
import BookCard from './card/card';

const DELETE_DIALOG_TITLE: string = 'זהירות!';
const DELETE_DIALOG_MESSAGE: string = 'האם אתה בטוח שברצונך למחוק?';
const ADD_BOOK_TITLE: string = 'הוסף ספר';
const BOOKS_OF_TITLE: string = ' הספרים של';

interface Props {
  readerData: Reader;
}

const BooksListOfReader: React.FC<Props> = (props) => {
  const classes = useStyles();
  const { readerData } = props;

  const loginUser = useSelector<RootState, Reader>(
    (state) => state.auth.loginUser
  );
  const { loading, error, data } = useQuery(GET_BOOKS_OF_USER, {
    fetchPolicy: 'network-only',
    nextFetchPolicy: 'network-only',
    variables: { equalTo: readerData?.id },
  });

  const [books, setBooks] = useState<Book[]>([]);
  const [openAddDialog, setOpenAddDialog] = useState<boolean>(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
  const [openMessage, setOpenMessage] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [selectedBook, setSelectedBook] = useState<number>();

  const { selectFavorite, deleteBook, addBookToUser } = useBooksListOfReader({
    books: books,
    setBooks: setBooks,
    setOpenMessage: setOpenMessage,
    setMessage: setMessage,
  });

  useEffect(() => {
    if (data) {
      setBooks(data.allBooksLists.nodes.map((book: any) => book.bookByBookId));
    }
  }, [data]);

  if (loading) {
    return <CircularProgress />;
  }
  if (error && readerData !== undefined) {
    return <h1>{ERROR_DB}</h1>;
  }

  let isUser: boolean = readerData?.id === loginUser?.id;

  const deleteHandle = (id: number) => {
    setOpenDeleteDialog(true);
    setSelectedBook(id);
  };
  return (
    <div className={classes.root}>
      <AddBookDialog
        open={openAddDialog}
        addBookToUser={(book: Book) => {
          addBookToUser(book);
        }}
        onClose={() => setOpenAddDialog(false)}
      />
      <Snackbar
        open={openMessage}
        autoHideDuration={6000}
        onClose={() => setOpenMessage(false)}
      >
        <Alert
          onClose={() => setOpenMessage(false)}
          severity='success'
          sx={{ width: '100%' }}
        >
          {message}
        </Alert>
      </Snackbar>
      <ConfirmDialog
        open={openDeleteDialog}
        title={DELETE_DIALOG_TITLE}
        message={DELETE_DIALOG_MESSAGE}
        onClose={() => setOpenDeleteDialog(false)}
        onConfirm={() => deleteBook(selectedBook as number)}
      />
      <Container>
        {readerData && isUser && (
          <div className={classes.upContainer}>
            <Typography variant='h6'>
              {BOOKS_OF_TITLE}{' '}
              <strong>
                {' '}
                {readerData.firstName} {readerData.lastName}
              </strong>
              :
            </Typography>
            <Button
              onClick={() => setOpenAddDialog(true)}
              color='success'
              variant='contained'
            >
              {ADD_BOOK_TITLE}
            </Button>
          </div>
        )}
        {books.map((val: Book) => {
          if (val !== undefined) {
            return (
              <BookCard
                book={val}
                selectFavorite={(book: Book) => selectFavorite(book)}
                deleteHandle={() => deleteHandle(val.id)}
                isUser={isUser}
              />
            );
          }
        })}
      </Container>
    </div>
  );
};

export default BooksListOfReader;
