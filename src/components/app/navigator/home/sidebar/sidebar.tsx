import { Button } from '@mui/material';
import React from 'react';

import { useStyles } from './sidebarStyles';
import { useNavigate } from 'react-router-dom';

const USER_MANGE_TITLE: string = 'ניהול משתמשים';
const AUTHOR_MANGE_TITLE: string = 'ניהול סופרים';
const BOOKS_MANGE_TITLE: string = 'ניהול ספרים';

interface NavigateItem {
  navigate: string;
  text: string;
}

const Menu: React.FC = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const Items: NavigateItem[] = [
    {
      navigate: 'readers',
      text: USER_MANGE_TITLE,
    },
    {
      navigate: 'authors',
      text: AUTHOR_MANGE_TITLE,
    },
    {
      navigate: 'books',
      text: BOOKS_MANGE_TITLE,
    },
  ];

  return (
    <div className={classes.root}>
      {Items.map((item: NavigateItem) => {
        return (
          <Button
            size='large'
            color='inherit'
            variant='text'
            onClick={() => navigate(item.navigate)}
          >
            {item.text}
          </Button>
        );
      })}
    </div>
  );
};

export default Menu;
