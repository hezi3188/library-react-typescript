import { Button } from '@mui/material';
import React from 'react';
import { useStyles } from './rightMenuStyles';

const Menu: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Button size='large' color='inherit' variant='text'>
        ניהול משתמשים
      </Button>
      <Button size='large' color='inherit' variant='text'>
        ניהול ספרים
      </Button>
      <Button size='large' color='inherit' variant='text'>
        ניהול ספרים
      </Button>
    </div>
  );
};

export default Menu;
