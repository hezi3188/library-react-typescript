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
import CircularProgress from '@mui/material/CircularProgress';
import { useSelector } from 'react-redux';

import { RootState } from '../../../../../../redux/store';
import Reader from '../../../../../../models/reader';
import { useStyles } from './addBookDialogStyles';
import Book from '../../../../../../models/book';
import { ALL_BOOKS_DONT_READ_OF_USER } from '../../../../../../GraphQL/Queries';
import useAddBookDialog from './useAddBookDialog';

interface Props {
  open: boolean;
  onClose: () => void;
  addBookToUser: (book: Book) => void;
}
const AddBookDialog: React.FC<Props> = (props) => {
  const { open, onClose, addBookToUser } = props;
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
      <DialogTitle>הוסף ספר</DialogTitle>
      <DialogContent>
        <FormControl className={classes.select}>
          <InputLabel>בחר ספר</InputLabel>
          <Select
            value={selectedBook?.toString()}
            label='בחר ספר'
            onChange={handleChange}
          >
            {books.map((val: Book) => {
              if (val !== undefined) {
                return (
                  <MenuItem key={val.id} value={val.id}>
                    {val.name}
                    {/* {val.firstName} {val.lastName} */}
                  </MenuItem>
                );
              }
            })}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button
          disabled={selectedBook === undefined}
          onClick={() => addBook(selectedBook as number)}
        >
          הוסף
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddBookDialog;
