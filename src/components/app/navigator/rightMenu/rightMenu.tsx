import { Button } from '@mui/material';
import React from 'react';
import { useStyles } from './rightMenuStyles';
import { useNavigate } from 'react-router-dom';

const USER_MANGE_TITLE: string = 'ניהול משתמשים';
const AUTHOR_MANGE_TITLE: string = 'ניהול סופרים';
const BOOKS_MANGE_TITLE: string = 'ניהול ספרים';

const Menu: React.FC = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  return (
    <div className={classes.root}>
      <Button
        size='large'
        color='inherit'
        variant='text'
        onClick={() => navigate('/')}
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
