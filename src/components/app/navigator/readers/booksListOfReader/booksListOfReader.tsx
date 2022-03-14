import { useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { useSelector } from 'react-redux';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import { Alert, Button, Snackbar } from '@mui/material';

import Book from '../../../../../models/book';
import Reader from '../../../../../models/reader';
import { GET_BOOKS_OF_USER } from '../../../../../GraphQL/Queries';
import { RootState } from '../../../../../redux/store';
import { useStyles } from './booksListOfReaderStyles';
import Container from '../../../../../comons/container/container';
import CustomCard from '../../../../../comons/customCard/card';
import useBooksListOfReader from './useBooksListOfReader';
import AddBookDialog from './addBookDialog/addBookDialog';
import ConfirmDialog from '../../../../../comons/confirmDialog/confirmDialog';
import { ERROR_DB } from '../../../../../utils/strings';

const DELETE_DIALOG_TITLE: string = 'זהירות!';
const DELETE_DIALOG_MESSAGE: string = 'האם אתה בטוח שברצונך למחוק?';
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
              הספרים של{' '}
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
              הוסף ספר
            </Button>
          </div>
        )}
        {books.map((val: Book) => {
          if (val !== undefined) {
            return (
              <CustomCard key={val.id}>
                <CardContent>
                  <Typography variant='h5' component='div'>
                    מזהה: {val.id}
                  </Typography>
                  <Typography variant='body1' component='div'>
                    שם: {val.name}. סופר: {val.author.firstName}{' '}
                    {val.author.lastName}
                  </Typography>
                </CardContent>
                {isUser && (
                  <CardActions sx={{ direction: 'rtl' }}>
                    <IconButton>
                      <DeleteIcon
                        onClick={() => deleteHandle(val.id)}
                        color='error'
                      />
                    </IconButton>
                    {loginUser?.favoriteBook?.id !== val.id ? (
                      <IconButton>
                        <StarBorderIcon onClick={() => selectFavorite(val)} />
                      </IconButton>
                    ) : (
                      <IconButton onClick={() => selectFavorite(undefined)}>
                        <StarIcon color='success' />
                      </IconButton>
                    )}
                  </CardActions>
                )}
              </CustomCard>
            );
          }
        })}
      </Container>
    </div>
  );
};

export default BooksListOfReader;
