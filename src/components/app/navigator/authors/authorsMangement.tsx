import React, { useState } from 'react';

import { useStyles } from './authorsMangementStyles';
import AuthorsList from './authorsList/authorsList';
import BooksListOfAuthor from './booksListOfAuthor/booksListOfAuthor';
import { Author } from '../../../../models/author';

const AuthorsMangement: React.FC = () => {
  const classes = useStyles();
  const [selectedAuthor, setSelectedAuthor] = useState<Author>();

  return (
    <div className={classes.root}>
      <AuthorsList
        getAuthorData={(authorData: Author) => setSelectedAuthor(authorData)}
      />
      <BooksListOfAuthor authorData={selectedAuthor} />
    </div>
  );
};

export default AuthorsMangement;
