import { Button, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { useStyles } from './upMenuStyles';
import { RootState } from '../../../../redux/store';
import Reader from '../../../../models/reader';
import Book from '../../../../models/book';
import { useDispatch } from 'react-redux';
import { logOut } from '../../../../redux/auth';
import ConfirmDialog from '../../../../comons/confirmDialog/confirmDialog';

const LIBRARY_TITLE: string = 'הספריה';
const HELLO_TITLE: string = ' שלום ';
const FAVORITE_TITLE: string = 'הספר המועדף עליך: ';
const NO_FAVORITE: string = 'אין לך ספר מועדף';
const LOG_OUT_BUTTON: string = 'התנתק';
const DELETE_BUTTON: string = 'מחק חשבון';
const LOGOUT_DIALOG_TITLE: string = 'זהירות!';
const LOGOUT_DIALOG_MESSAGE: string = 'האם אתה בטוח שאתה רוצה להתנתק?';

const Menu: React.FC = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [logoutDialogOpen, setLogoutDialogOpen] = useState<boolean>(false);
  const loginUser = useSelector<RootState, Reader>(
    (state) => state.auth.loginUser
  );
  const favoriteBook = useSelector<RootState, Book>(
    (state) => state.auth.favoriteBook
  );

  return (
    <div className={classes.upMenuContainer}>
      <ConfirmDialog
        open={logoutDialogOpen}
        title={LOGOUT_DIALOG_TITLE}
        message={LOGOUT_DIALOG_MESSAGE}
        onClose={() => setLogoutDialogOpen(false)}
        onConfirm={() => dispatch(logOut())}
      />
      <div>
        <Typography className={classes.title} align='center' variant='h2'>
          {LIBRARY_TITLE}
        </Typography>
      </div>
      <div className={classes.upMenuLeft}>
        <div className={classes.loginOutput}>
          <Typography align='center' variant='h5'>
            {HELLO_TITLE} {loginUser?.firstName} {loginUser?.lastName}
          </Typography>
          {favoriteBook?.name !== undefined ? (
            <Typography align='center' variant='h6'>
              {FAVORITE_TITLE} {favoriteBook?.name}
            </Typography>
          ) : (
            <Typography align='center' variant='h6'>
              {NO_FAVORITE}
            </Typography>
          )}
        </div>
        <div>
          <Button
            style={{ backgroundColor: 'yellow' }}
            size='large'
            variant='contained'
            onClick={() => setLogoutDialogOpen(true)}
          >
            {LOG_OUT_BUTTON}
          </Button>
        </div>
        <div>
          <Button size='large' color='error' variant='contained'>
            {DELETE_BUTTON}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Menu;
