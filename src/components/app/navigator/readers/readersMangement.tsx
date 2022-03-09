import React, { useState } from 'react';

import { useStyles } from './readersMangementStyles';
import ReadersList from './readersList/readersList';
import BooksListOfReader from './booksListOfReader/booksListOfReader';

const ReadersMangement: React.FC = () => {
  const classes = useStyles();
  const [selectedReader, setSelectedReader] = useState<number>();

  return (
    <div className={classes.root}>
      <ReadersList
        getReaderId={(readerId: number) => setSelectedReader(readerId)}
      />
      <BooksListOfReader readerId={selectedReader} />
    </div>
  );
};

export default ReadersMangement;
