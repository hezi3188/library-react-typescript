import React, { useState } from 'react';

import { useStyles } from './booksMangementStyles';
import BooksList from './booksList/booksList';
import ReadersListOfBook from './readersListOfBook/readersListOfBook';
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
