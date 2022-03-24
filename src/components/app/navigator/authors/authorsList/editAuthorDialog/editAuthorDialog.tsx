//rafce
import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { useStyles } from './editAuthorDialogStyles';
import useEditAuthorDialog from './useEditAuthorDialog';
import { Author } from '../../../../../../models/author';

const EDIT_AUTHOR_TITLE: string = 'פרטי משתמש';
const EDIT_AUTHOR_BUTTON: string = 'שמור שינויים';
const FIRST_NAME: string = 'שם פרטי';
const LAST_NAME: string = 'שם משפחה';

const schema = yup.object().shape({
  firstName: yup.string().required('שם פרטי הוא שדה חובה'),
  lastName: yup.string().required('שם משפחה הוא שדה חובה'),
});

interface Props {
  open: boolean;
  onClose: () => void;
  author?: Author;
}
const EditAuthorDialog: React.FC<Props> = (props) => {
  const { open, onClose, author } = props;
  const classes = useStyles();

  const { register, reset, handleSubmit, formState } = useForm({
    resolver: yupResolver(schema),
  });

  const handleClose = () => {
    onClose();
  };
  const [firstName, setFirstName] = useState<string>();
  const [lastName, setLastName] = useState<string>();
  const { editAuthor: addBook } = useEditAuthorDialog({
    handleClose,
  });

  useEffect(() => {
    reset();
    setFirstName(author?.firstName);
    setLastName(author?.lastName);
  }, [author, onClose, reset]);

  const submitForm = () => {
    addBook(firstName as string, lastName as string, author?.id as number);
  };
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{EDIT_AUTHOR_TITLE}</DialogTitle>
      <DialogContent>
        <FormControl
          onSubmit={handleSubmit(submitForm)}
          className={classes.select}
        >
          <TextField
            label={FIRST_NAME}
            variant='outlined'
            required
            error={formState.errors.firstName}
            defaultValue={firstName}
            inputProps={{ ...register('firstName') }}
            helperText={formState.errors.firstName?.message}
            onChange={(e) => setFirstName(e.target.value)}
          />

          <TextField
            required
            error={formState.errors.lastName}
            helperText={formState.errors.lastName?.message}
            label={LAST_NAME}
            variant='outlined'
            defaultValue={lastName}
            inputProps={{ ...register('lastName') }}
            onChange={(e) => setLastName(e.target.value)}
          />
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button type='submit' id='submit' onClick={handleSubmit(submitForm)}>
          {EDIT_AUTHOR_BUTTON}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditAuthorDialog;
