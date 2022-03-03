import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import ReadersMangement from './readers/readersMangement';
import AuthorsMangement from './authors/authorsMangement';
import BooksMangement from './books/booksMangement';
import UpMenu from './upMenu/upMenu';
import RightMenu from './rightMenu/rightMenu';
import { useStyles } from './navigatorStyles';

const Navigator: React.FC = () => {
  const classes = useStyles();

  return (
    <BrowserRouter>
      <div className={classes.root}>
        <div className={classes.menu}>
          <UpMenu />
        </div>
        <div className={classes.container}>
          <div className={classes.rightContainer}>
            <RightMenu />
          </div>
          <div className={classes.leftContainer}>
            <Routes>
              <Route path='/' element={<ReadersMangement />} />
              <Route path='authors/*' element={<AuthorsMangement />} />
              <Route path='books/*' element={<BooksMangement />} />
            </Routes>
          </div>
        </div>
        {/* <nav>
        <Link to='/'>Readers</Link>|<Link to='books'>Books</Link>|
        <Link to='authors'>Authors</Link>
      </nav> */}
      </div>
    </BrowserRouter>
  );
};

export default Navigator;
