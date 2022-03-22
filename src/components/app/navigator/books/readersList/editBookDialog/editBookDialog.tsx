//rafce
import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';

import { useStyles } from './editBookDialogStyles';
import useEditBookDialog from './useEditBookDialog';
import Book from '../../../../../../models/book';

const EDIT_BOOK_TITLE: string = 'פרטי הספר';
const EDIT_BOOK_BUTTON: string = 'שמור שינויים';
const NAME: string = 'שם הספר';

interface Props {
  open: boolean;
  onClose: () => void;
  book?: Book;
}
const EditBookDialog: React.FC<Props> = (props) => {
  const { open, onClose, book } = props;
  const classes = useStyles();

  const handleClose = () => {
    onClose();
  };
  const [name, setName] = useState<string>();
  const { editBook } = useEditBookDialog({
    handleClose: handleClose,
  });

  useEffect(() => {
    setName(book?.name);
  }, [book, onClose]);

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{EDIT_BOOK_TITLE}</DialogTitle>
      <DialogContent>
        <FormControl className={classes.select}>
          <TextField
            label={NAME}
            variant='outlined'
            required
            defaultValue={name}
            onChange={(e) => setName(e.target.value)}
          />
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button
          disabled={!name}
          onClick={() => editBook(book?.id as number, name as string)}
        >
          {EDIT_BOOK_BUTTON}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditBookDialog;
