import { Button } from '@mui/material';
import React from 'react';
import { useStyles } from './rightMenuStyles';
import { useNavigate } from 'react-router-dom';

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
        ניהול משתמשים
      </Button>
      <Button
        size='large'
        color='inherit'
        variant='text'
        onClick={() => navigate('authors')}
      >
        ניהול סופרים
      </Button>
      <Button
        size='large'
        color='inherit'
        variant='text'
        onClick={() => navigate('books')}
      >
        ניהול ספרים
      </Button>
    </div>
  );
};

export default Menu;
