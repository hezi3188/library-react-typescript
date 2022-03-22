import React, { useState } from 'react';

import { useStyles } from './booksMangementStyles';
import BooksList from './readersList/booksList';
import ReadersListOfBook from './booksListOfReader/readersListOfBook';
import Book from '../../../../models/book';

const BooksMangement: React.FC = () => {
  const classes = useStyles();
  const [selectedBook, setSelectedBook] = useState<Book>();

  return (
    <div className={classes.root}>
      <BooksList getBookData={(bookData: Book) => setSelectedBook(bookData)} />
      <ReadersListOfBook bookData={selectedBook} />
    </div>
  );
};

export default BooksMangement;
