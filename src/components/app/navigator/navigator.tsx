import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import ReadersMangement from './readers/readersMangement';
import AuthorsMangement from './authors/authorsMangement';
import BooksMangement from './books/booksMangement';
import Home from './home/home';
import Login from './login/login';
import { useStyles } from './navigatorStyles';
import { RootState } from '../../../redux/store';
import Reader from '../../../models/reader';

const Navigator: React.FC = () => {
  const classes = useStyles();
  const auth = useSelector<RootState, Reader>((state) => state.auth.loginUser);
  return (
    <BrowserRouter>
      {/* <div className={classes.root}>
        <div className={classes.menu}></div>
        <div className={classes.container}>
          <div className={classes.rightContainer}></div>
          <div className={classes.leftContainer}> */}
      <Routes>
        <Route path='/' element={<Login />} />
        {auth ? (
          <Route path='home' element={<Home />}>
            <Route path='readers' element={<ReadersMangement />} />
            <Route path='authors/*' element={<AuthorsMangement />} />
            <Route path='books/*' element={<BooksMangement />} />
          </Route>
        ) : (
          <Route path='*' element={<Navigate to='/' />} />
        )}
      </Routes>
      {/* </div>
        </div>
      </div> */}
    </BrowserRouter>
  );
};

export default Navigator;
