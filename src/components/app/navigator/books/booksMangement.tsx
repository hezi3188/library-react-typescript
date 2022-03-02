import { useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';

import { Book } from '../../../../models/book';
import { LOAD_BOOKS } from '../../../../GraphQL/Queries';

const BooksMangement: React.FC = () => {
  const { error, loading, data } = useQuery(LOAD_BOOKS);
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
    return <h1>התרחשה שגיאה בבקשה נסה מאוחר יותר</h1>;
  }
  return (
    <div>
      ff
      {books.map((val: Book) => {
        return <h1> {val.name}</h1>;
      })}
    </div>
  );
};

export default BooksMangement;
