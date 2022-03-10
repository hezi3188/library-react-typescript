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
import { Button } from '@mui/material';

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
  const [selectedBook, setSelectedBook] = useState<number>();

  const { selectFavorite, deleteBook } = useBooksListOfReader({
    books: books,
    setBooks: setBooks,
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
    return <h1>התרחשה שגיאה בבקשה נסה מאוחר יותר</h1>;
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
        addBookToUser={(book: Book) => setBooks([...books, book])}
        onClose={() => setOpenAddDialog(false)}
      />
      <ConfirmDialog
        open={openDeleteDialog}
        title='זהירות!'
        message='האם אתה בטוח שברצונך למחוק?'
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
              <CustomCard>
                <CardContent>
                  <Typography variant='h5' component='div'>
                    מזהה: {val.id}
                  </Typography>
                  <Typography variant='body1' component='div'>
                    שם: {val.name}
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
                    {loginUser?.favoriteBook !== val.id ? (
                      <IconButton>
                        <StarBorderIcon
                          onClick={() => selectFavorite(val.id)}
                        />
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
