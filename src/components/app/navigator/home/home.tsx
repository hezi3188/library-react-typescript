import React from 'react';
import { Outlet } from 'react-router-dom';

import Toolbar from './toolbar/toolbar';
import Sidebar from './sidebar/sidebar';
import { useStyles } from './homeStyles';

const Navigator: React.FC = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.menu}>
        <Toolbar />
      </div>
      <div className={classes.container}>
        <div className={classes.rightContainer}>
          <Sidebar />
        </div>
        <div className={classes.leftContainer}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Navigator;
