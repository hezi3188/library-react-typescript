import { Button, Typography } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';

import { useStyles } from './upMenuStyles';
import { RootState } from '../../../../redux/store';
import Reader from '../../../../models/reader';
import Book from '../../../../models/book';
import { useDispatch } from 'react-redux';
import { logOut } from '../../../../redux/auth';

const Menu: React.FC = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const loginUser = useSelector<RootState, Reader>(
    (state) => state.auth.loginUser
  );
  const favoriteBook = useSelector<RootState, Book>(
    (state) => state.auth.favoriteBook
  );

  return (
    <div className={classes.upMenuContainer}>
      <div>
        <Typography className={classes.title} align='center' variant='h2'>
          הספריה
        </Typography>
      </div>
      <div className={classes.upMenuLeft}>
        <div className={classes.loginOutput}>
          <Typography align='center' variant='h5'>
            שלום {loginUser?.firstName} {loginUser?.lastName}
          </Typography>
          <Typography align='center' variant='h6'>
            הספר המועדף עליך: {favoriteBook?.name}
          </Typography>
        </div>
        <div>
          <Button
            style={{ backgroundColor: 'yellow' }}
            size='large'
            variant='contained'
            onClick={() => dispatch(logOut())}
          >
            התנתק
          </Button>
        </div>
        <div>
          <Button size='large' color='error' variant='contained'>
            מחק חשבון
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Menu;
