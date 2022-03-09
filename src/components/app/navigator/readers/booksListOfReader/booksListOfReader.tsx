import { useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { useSelector } from 'react-redux';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';

import Book from '../../../../../models/book';
import Reader from '../../../../../models/reader';
import { GET_BOOKS_OF_USER } from '../../../../../GraphQL/Queries';
import { RootState } from '../../../../../redux/store';
import { useStyles } from './booksListOfReaderStyles';
import Container from '../../../../../comons/container/container';
import CustomCard from '../../../../../comons/customCard/card';
import useBooksListOfReader from './useBooksListOfReader';

interface Props {
  readerData: Reader;
}

const BooksListOfReader: React.FC<Props> = (props) => {
  const classes = useStyles();
  const { readerData } = props;

  const loginUser = useSelector<RootState, Reader>(
    (state) => state.auth.loginUser
  );
  const { loading, error, data } = useQuery(GET_BOOKS_OF_USER, {
    variables: { equalTo: readerData?.id },
  });

  const [books, setBooks] = useState<Book[]>([]);
  const { selectFavorite } = useBooksListOfReader({ books: books });

  useEffect(() => {
    if (data) {
      setBooks(data.allBooksLists.nodes.map((book: any) => book.bookByBookId));
    }
  }, [data]);

  if (loading) {
    return <CircularProgress />;
  }
  if (error && readerData !== undefined) {
    return <h1>התרחשה שגיאה בבקשה נסה מאוחר יותר</h1>;
  }

  return (
    <div className={classes.root}>
      <Container>
        {readerData && (
          <Typography variant='h6'>
            הספרים של {readerData.firstName} {readerData.lastName}{' '}
          </Typography>
        )}
        {books.map((val: Book) => {
          if (val !== undefined) {
            return (
              <CustomCard>
                <CardContent>
                  <Typography variant='h5' component='div'>
                    מזהה: {val.id}
                  </Typography>
                  <Typography variant='body1' component='div'>
                    שם: {val.name}
                  </Typography>
                </CardContent>
                {readerData?.id === loginUser?.id && (
                  <CardActions sx={{ direction: 'rtl' }}>
                    <IconButton>
                      <DeleteIcon color='error' />
                    </IconButton>
                    {loginUser?.favoriteBook !== val.id ? (
                      <IconButton>
                        <StarBorderIcon
                          onClick={() => selectFavorite(val.id)}
                        />
                      </IconButton>
                    ) : (
                      <IconButton onClick={() => selectFavorite(undefined)}>
                        <StarIcon color='success' />
                      </IconButton>
                    )}
                  </CardActions>
                )}
              </CustomCard>
            );
          }
        })}
      </Container>
    </div>
  );
};

export default BooksListOfReader;
