import React, { useState } from 'react';

import { useStyles } from './readersMangementStyles';
import ReadersList from './readersList/readersList';
import BooksListOfReader from './booksListOfReader/booksListOfReader';
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
