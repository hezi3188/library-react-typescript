import { useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';

import { Reader } from '../../../models/reader';
import { LOAD_READERS } from '../../../GraphQL/Queries';
import { RootState } from '../../../redux/store';
import { useSelector, useDispatch } from 'react-redux';
import { decrement, increment } from '../../../redux/counter';
const ReadersMangement: React.FC = () => {
  const count = useSelector<RootState, number>((state) => state.counter.value);
  const dispatch = useDispatch();
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
      <div>
        <div>
          <button
            aria-label='Increment value'
            onClick={() => dispatch(increment())}
          >
            Increment
          </button>
          <span>{count}</span>
          <button
            aria-label='Decrement value'
            onClick={() => dispatch(decrement())}
          >
            Decrement
          </button>
        </div>
      </div>
      {readers.map((val: Reader) => {
        return <h1> {val.firstName}</h1>;
      })}
    </div>
  );
};

export default ReadersMangement;
