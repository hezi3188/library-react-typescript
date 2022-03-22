//rafce
import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';

import Reader from '../../../../../../models/reader';
import { useStyles } from './editAuthorDialogStyles';
import useAddBookDialog from './useEditAuthorDialog';

const EDIT_READER_TITLE: string = 'פרטי משתמש';
const EDIT_READER_BUTTON: string = 'שמור שינויים';
const FIRST_NAME: string = 'שם פרטי';
const LAST_NAME: string = 'שם משפחה';

interface Props {
  open: boolean;
  onClose: () => void;
  reader: Reader;
}
const AddBookDialog: React.FC<Props> = (props) => {
  const { open, onClose, reader } = props;
  const classes = useStyles();

  const handleClose = () => {
    onClose();
  };
  const [firstName, setFirstName] = useState<string>();
  const [lastName, setLastName] = useState<string>();
  const { editReader: addBook } = useAddBookDialog({
    handleClose: handleClose,
  });

  useEffect(() => {
    setFirstName(reader?.firstName);
    setLastName(reader?.lastName);
  }, [reader, onClose]);

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{EDIT_READER_TITLE}</DialogTitle>
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
              reader?.id as number
            )
          }
        >
          {EDIT_READER_BUTTON}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddBookDialog;
