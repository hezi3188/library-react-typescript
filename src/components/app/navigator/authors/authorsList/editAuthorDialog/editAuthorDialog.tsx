//rafce
import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';

import { useStyles } from './editAuthorDialogStyles';
import useAddBookDialog from './useEditAuthorDialog';
import { Author } from '../../../../../../models/author';

const EDIT_AUTHOR_TITLE: string = 'פרטי משתמש';
const EDIT_AUTHOR_BUTTON: string = 'שמור שינויים';
const FIRST_NAME: string = 'שם פרטי';
const LAST_NAME: string = 'שם משפחה';

interface Props {
  open: boolean;
  onClose: () => void;
  author?: Author;
}
const AddBookDialog: React.FC<Props> = (props) => {
  const { open, onClose, author } = props;
  const classes = useStyles();

  const handleClose = () => {
    onClose();
  };
  const [firstName, setFirstName] = useState<string>();
  const [lastName, setLastName] = useState<string>();
  const { editAuthor: addBook } = useAddBookDialog({
    handleClose,
  });

  useEffect(() => {
    setFirstName(author?.firstName);
    setLastName(author?.lastName);
  }, [author, onClose]);

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{EDIT_AUTHOR_TITLE}</DialogTitle>
      <DialogContent>
        <FormControl className={classes.select}>
          <TextField
            label={FIRST_NAME}
            variant='outlined'
            required
            defaultValue={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <TextField
            required
            label={LAST_NAME}
            variant='outlined'
            defaultValue={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button
          disabled={!firstName || !lastName}
          onClick={() =>
            addBook(
              firstName as string,
              lastName as string,
              author?.id as number
            )
          }
        >
          {EDIT_AUTHOR_BUTTON}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddBookDialog;
