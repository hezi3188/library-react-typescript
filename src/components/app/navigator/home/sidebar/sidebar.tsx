import { Button } from '@mui/material';
import React from 'react';

import { useStyles } from './sidebarStyles';
import { useNavigate } from 'react-router-dom';

const USER_MANGE_TITLE: string = 'ניהול משתמשים';
const AUTHOR_MANGE_TITLE: string = 'ניהול סופרים';
const BOOKS_MANGE_TITLE: string = 'ניהול ספרים';

const Menu: React.FC = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const menuItem ={
    navigate: '/',
    text: USER_MANGE_TITLE,
  }
  return (
    <div className={classes.root}>
      <Button
        size='large'
        color='inherit'
        variant='text'
        onClick={() => navigate('readers')}
      >
        {USER_MANGE_TITLE}
      </Button>
      <Button
        size='large'
        color='inherit'
        variant='text'
        onClick={() => navigate('authors')}
      >
        {AUTHOR_MANGE_TITLE}
      </Button>
      <Button
        size='large'
        color='inherit'
        variant='text'
        onClick={() => navigate('books')}
      >
        {BOOKS_MANGE_TITLE}
      </Button>
    </div>
  );
};

export default Menu;
