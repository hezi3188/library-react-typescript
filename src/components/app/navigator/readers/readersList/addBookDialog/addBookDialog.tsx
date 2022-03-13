//rafce
import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useLazyQuery } from '@apollo/client';
import { useSelector } from 'react-redux';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

import { RootState } from '../../../../../../redux/store';
import Reader from '../../../../../../models/reader';
import { useStyles } from './addBookDialogStyles';
import Book from '../../../../../../models/book';
import { ALL_BOOKS_DONT_READ_OF_USER } from '../../../../../../GraphQL/Queries';
import useAddBookDialog from './useAddBookDialog';

const NO_BOOKS: string = 'משתמש זה כבר השאיל את כל הספרים הקיימים בספריה!';
const EDIT_READER_TITLE: string = 'פרטי משתמש';
const EDIT_READER_BUTTON: string = 'שמור שינויים';
const FIRST_NAME: string = 'שם פרטי';
const LAST_NAME: string = 'שם משפחה';

interface Props {
  open: boolean;
  onClose: () => void;
  addBookToUser: (book: Book) => void;
  reader: Reader;
}
const AddBookDialog: React.FC<Props> = (props) => {
  const { open, onClose, addBookToUser, reader } = props;
  const classes = useStyles();
  const loginUser = useSelector<RootState, Reader>(
    (state) => state.auth.loginUser
  );

  const handleClose = () => {
    onClose();
  };
  const [books, setBooks] = useState<Book[]>([]);
  const [selectedBook, setSelectedBook] = useState<number>();
  const { addBook } = useAddBookDialog({
    handleClose: handleClose,
    addBookToUser: addBookToUser,
  });
  const [allBooks] = useLazyQuery(ALL_BOOKS_DONT_READ_OF_USER, {
    fetchPolicy: 'network-only',
    nextFetchPolicy: 'network-only',
  });

  useEffect(() => {
    if (open) {
      setSelectedBook(undefined);
      allBooks({ variables: { equalTo: loginUser?.id } }).then((data) => {
        setBooks(data.data.allBooks.nodes);
      });
    }
  }, [open, allBooks, loginUser]);

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedBook(parseInt(event.target.value));
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      {books.length === 0 ? (
        <Typography align='center' variant='h6'>
          {NO_BOOKS}
        </Typography>
      ) : (
        <div>
          <DialogTitle>{EDIT_READER_TITLE}</DialogTitle>
          <DialogContent>
            <FormControl className={classes.select}>
              <TextField
                label={FIRST_NAME}
                variant='outlined'
                required
                defaultValue={reader?.firstName}
              />
              <TextField
                required
                label={LAST_NAME}
                variant='outlined'
                defaultValue={reader?.lastName}
              />
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button
              disabled={selectedBook === undefined}
              onClick={() => addBook(selectedBook as number)}
            >
              {EDIT_READER_BUTTON}
            </Button>
          </DialogActions>
        </div>
      )}
    </Dialog>
  );
};

export default AddBookDialog;
