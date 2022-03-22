import React, { useState } from 'react';

import { useStyles } from './authorsMangementStyles';
import ReadersList from './authorsList/authorsList';
import BooksListOfReader from './booksListOfAuthor/booksListOfAuthor';
import Reader from '../../../../models/reader';

const ReadersMangement: React.FC = () => {
  const classes = useStyles();
  const [selectedReader, setSelectedReader] = useState<Reader>();

  return (
    <div className={classes.root}>
      <ReadersList
        getReaderData={(readerData: Reader) => setSelectedReader(readerData)}
      />
      <BooksListOfReader readerData={selectedReader} />
    </div>
  );
};

export default ReadersMangement;
