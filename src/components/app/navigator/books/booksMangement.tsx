import { useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';

import Book from '../../../../models/book';
import { GET_BOOKS } from '../../../../GraphQL/book/Queries';
import { ERROR_DB } from '../../../../utils/strings';

const BooksMangement: React.FC = () => {
  const { error, loading, data } = useQuery(GET_BOOKS);
  const [books, setBooks] = useState<Book[]>([]);
  useEffect(() => {
    if (data) {
      setBooks(data.allBooks.nodes);
    }
  }, [data]);
  if (loading) {
    return <CircularProgress />;
  }
  if (error) {
    return <h1>{ERROR_DB}</h1>;
  }
  return (
    <div>
      ff
      {books.map((val: Book) => {
        if (val) {
          return <h1> {val.name}</h1>;
        }
      })}
    </div>
  );
};

export default BooksMangement;
