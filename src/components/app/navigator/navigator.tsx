import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import ReadersMangement from './readers/readersMangement';
import AuthorsMangement from './authors/authorsMangement';
import BooksMangement from './books/booksMangement';
const Navigator: React.FC = () => {
  return (
    <BrowserRouter>
    yttrytryt
      <nav>
        <Link to='/'>Readers</Link>|<Link to='books'>Books</Link>|
        <Link to='authors'>Authors</Link>
      </nav>
      <Routes>
        <Route path='/' element={<ReadersMangement />} />
        <Route path='authors/*' element={<AuthorsMangement />} />
        <Route path='books/*' element={<BooksMangement />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Navigator;
