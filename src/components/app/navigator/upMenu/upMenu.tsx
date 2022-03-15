import { Button, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { useStyles } from './upMenuStyles';
import { RootState } from '../../../../redux/store';
import Reader from '../../../../models/reader';
import ConfirmDialog from '../../../../comons/confirmDialog/confirmDialog';
import useUpMenu from './useUpMenu';

const LIBRARY_TITLE: string = 'הספריה';
const HELLO_TITLE: string = ' שלום ';
const FAVORITE_TITLE: string = 'הספר המועדף עליך: ';
const NO_FAVORITE: string = 'אין לך ספר מועדף';
const LOG_OUT_BUTTON: string = 'התנתק';
const DELETE_BUTTON: string = 'מחק חשבון';
const LOGOUT_DIALOG_TITLE: string = 'זהירות!';
const LOGOUT_DIALOG_MESSAGE: string = 'האם אתה בטוח שאתה רוצה להתנתק?';
const DEL_ACCOUNT_DIALOG_TITLE: string = 'זהירות!';
const DEL_ACCOUNT_DIALOG_MESSAGE: string =
  'האם אתה בטוח שאתה רוצה למחוק את החשבון?';

const Menu: React.FC = () => {
  const { deleteAccount, logout } = useUpMenu({});
  const classes = useStyles();
  const [logoutDialogOpen, setLogoutDialogOpen] = useState<boolean>(false);
  const [delAccountDialogOpen, setDelAccountDialogOpen] =
    useState<boolean>(false);
  const loginUser = useSelector<RootState, Reader>(
    (state) => state.auth.loginUser
  );

  return (
    <div className={classes.upMenuContainer}>
      <ConfirmDialog
        open={logoutDialogOpen}
        title={LOGOUT_DIALOG_TITLE}
        message={LOGOUT_DIALOG_MESSAGE}
        onClose={() => setLogoutDialogOpen(false)}
        onConfirm={() => logout()}
      />
      <ConfirmDialog
        open={delAccountDialogOpen}
        title={DEL_ACCOUNT_DIALOG_TITLE}
        message={DEL_ACCOUNT_DIALOG_MESSAGE}
        onClose={() => setDelAccountDialogOpen(false)}
        onConfirm={() => deleteAccount()}
      />
      <div>
        <Typography
          sx={{ fontSize: '4vw' }}
          className={classes.title}
          align='center'
          variant='h2'
        >
          {LIBRARY_TITLE}
        </Typography>
      </div>
      <div className={classes.upMenuLeft}>
        <div className={classes.loginOutput}>
          <Typography sx={{ fontSize: '4vh' }} align='center' variant='h5'>
            {HELLO_TITLE} {loginUser?.firstName} {loginUser?.lastName}
          </Typography>
          <Typography align='center' variant='h6' sx={{ fontSize: '2.7vh' }}>
            {loginUser?.favoriteBook?.name
              ? `${FAVORITE_TITLE} ${loginUser.favoriteBook.name}`
              : NO_FAVORITE}
          </Typography>
        </div>
        <div>
          <Button
            className={classes.logoutButton}
            size='large'
            sx={{ fontSize: '2vh' }}
            variant='contained'
            onClick={() => setLogoutDialogOpen(true)}
          >
            {LOG_OUT_BUTTON}
          </Button>
        </div>
        <div>
          <Button
            className={classes.deleteButton}
            sx={{ fontSize: '2vh' }}
            onClick={() => setDelAccountDialogOpen(true)}
            size='large'
            color='error'
            variant='contained'
          >
            {DELETE_BUTTON}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Menu;
