// import { useQuery } from '@apollo/client';
import React from 'react';
// import CircularProgress from '@mui/material/CircularProgress';
import { useSelector } from 'react-redux';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
// import { Alert, Button, Snackbar } from '@mui/material';

import Book from '../../../../../models/book';
import Reader from '../../../../../models/reader';
// import { GET_BOOKS_OF_USER } from '../../../../../GraphQL/Queries';
import { RootState } from '../../../../../redux/store';
import { useStyles } from './booksListOfReaderStyles';
// import Container from '../../../../../comons/container/container';
import CustomCard from '../../../../../comons/customCard/card';
// import useBooksListOfReader from './useBooksListOfReader';
// import AddBookDialog from './addBookDialog/addBookDialog';
// import ConfirmDialog from '../../../../../comons/confirmDialog/confirmDialog';
// import { ERROR_DB } from '../../../../../utils/strings';

const DELETE_DIALOG_TITLE: string = 'זהירות!';
const DELETE_DIALOG_MESSAGE: string = 'האם אתה בטוח שברצונך למחוק?';
interface Props {
  book: Book;
  selectFavorite: (book: Book) => void;
  deleteHandle: (id: number) => void;
  isUser: boolean;
}

const BooksListOfReader: React.FC<Props> = (props) => {
  const classes = useStyles();
  const { book, selectFavorite, deleteHandle } = props;

  const loginUser = useSelector<RootState, Reader>(
    (state) => state.auth.loginUser
  );

  //   const { loading, error, data } = useQuery(GET_BOOKS_OF_USER, {
  //     fetchPolicy: 'network-only',
  //     nextFetchPolicy: 'network-only',
  //     variables: { equalTo: readerData?.id },
  //   });

  //   const [books, setBooks] = useState<Book[]>([]);
  //   const [openAddDialog, setOpenAddDialog] = useState<boolean>(false);
  //   const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
  //   const [openMessage, setOpenMessage] = useState<boolean>(false);
  //   const [message, setMessage] = useState<string>('');
  //   const [selectedBook, setSelectedBook] = useState<number>();

  //   const { selectFavorite, deleteBook, addBookToUser } = useBooksListOfReader({
  //     books: books,
  //     setBooks: setBooks,
  //     setOpenMessage: setOpenMessage,
  //     setMessage: setMessage,
  //   });

  return (
    <div className={classes.root}>
      <CustomCard>
        <CardContent>
          <Typography variant='h5' component='div'>
            מזהה: {book.id}
          </Typography>
          <Typography variant='body1' component='div'>
            שם: {book.name}. סופר: {book.author.firstName}{' '}
            {book.author.lastName}
          </Typography>
        </CardContent>
        {isUser && (
          <CardActions sx={{ direction: 'rtl' }}>
            <IconButton>
              <DeleteIcon onClick={() => deleteHandle(book.id)} color='error' />
            </IconButton>
            {loginUser?.favoriteBook?.id !== book.id ? (
              <IconButton>
                <StarBorderIcon onClick={() => selectFavorite(book)} />
              </IconButton>
            ) : (
              <IconButton onClick={() => selectFavorite(undefined)}>
                <StarIcon color='success' />
              </IconButton>
            )}
          </CardActions>
        )}
      </CustomCard>
    </div>
  );
};

export default BooksListOfReader;
