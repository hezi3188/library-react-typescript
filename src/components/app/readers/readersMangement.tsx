import { useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';

import { Reader } from '../../../models/reader';
import { LOAD_READERS } from '../../../GraphQL/Queries';

const ReadersMangement: React.FC = () => {
  const { error, loading, data } = useQuery(LOAD_READERS);
  const [readers, setReaders] = useState<Reader[]>([]);
  useEffect(() => {
    if (data) {
      setReaders(data.allReaders.nodes);
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
      {readers.map((val: Reader) => {
        return <h1> {val.firstName}</h1>;
      })}
    </div>
  );
};

export default ReadersMangement;
