import { useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';

import Book from '../../../../../models/book';
import { GET_BOOKS_OF_AUTHOR } from '../../../../../GraphQL/book/Queries';
import { useStyles } from './booksListOfAuthorStyles';
import Container from '../../../../../comons/container/container';
import { ERROR_DB } from '../../../../../utils/strings';
import BookCard from './card/card';
import { Author } from '../../../../../models/author';

const BOOKS_OF_TITLE: string = ' הספרים של';

interface Props {
  authorData?: Author;
}

const BooksListOfAuthor: React.FC<Props> = (props) => {
  const classes = useStyles();
  const { authorData } = props;

  const { loading, error, data } = useQuery(GET_BOOKS_OF_AUTHOR, {
    fetchPolicy: 'network-only',
    variables: { equalTo: authorData?.id },
  });

  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    if (data) {
      setBooks(data.allBooks.nodes);
    }
  }, [data]);

  if (loading) {
    return <CircularProgress />;
  }
  if (error && authorData) {
    return <h1>{ERROR_DB}</h1>;
  }

  return (
    <div className={classes.root}>
      <Container>
        {authorData && (
          <div className={classes.upContainer}>
            <Typography style={{ fontSize: '4vh' }} variant='h6'>
              {BOOKS_OF_TITLE}
              <strong>
                {` ${authorData.firstName} ${authorData.lastName} :`}
              </strong>
            </Typography>
          </div>
        )}
        {books.map((val: Book) => {
          if (val) {
            return <BookCard book={val} />;
          }
        })}
      </Container>
    </div>
  );
};

export default BooksListOfAuthor;
