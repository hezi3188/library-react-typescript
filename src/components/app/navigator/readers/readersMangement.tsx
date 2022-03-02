import { useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { useSelector, useDispatch } from 'react-redux';

import Reader from '../../../../models/reader';
import { LOAD_READERS } from '../../../../GraphQL/Queries';
import { RootState } from '../../../../redux/store';
import { login, logOut } from '../../../../redux/auth';

const ReadersMangement: React.FC = () => {
  const count = useSelector<RootState, Reader>((state) => state.auth.loginUser);
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
      <div></div>
      {readers.map((val: Reader) => {
        if (val !== undefined) {
          return <h1> {val.firstName}</h1>;
        }
      })}
    </div>
  );
};

export default ReadersMangement;
