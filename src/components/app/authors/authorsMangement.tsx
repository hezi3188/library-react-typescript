import { useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';

import { Author } from '../../../models/author';
import { LOAD_AUTHORS } from '../../../GraphQL/Queries';

const AuthorsMangement: React.FC = () => {
  const { error, loading, data } = useQuery(LOAD_AUTHORS);
  const [authors, setAuthors] = useState<Author[]>([]);
  useEffect(() => {
    if (data) {
      setAuthors(data.allAuthors.nodes);
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
      {authors.map((val: Author) => {
        return <h1> {val.firstName}</h1>;
      })}
    </div>
  );
};

export default AuthorsMangement;
