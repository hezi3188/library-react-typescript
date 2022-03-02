//rafc
import { useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { useSelector, useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Reader } from '../../models/reader';
import { LOAD_READERS } from '../../GraphQL/Queries';
import { RootState } from '../../redux/store';
import { decrement, increment } from '../../redux/counter';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const ReadersMangement: React.FC = () => {
  const count = useSelector<RootState, number>((state) => state.counter.value);
  const dispatch = useDispatch();
  const { error, loading, data } = useQuery(LOAD_READERS);
  const [readers, setReaders] = useState<Reader[]>([]);
  const [selectedReader, setSelectedReader] = useState<string>('');
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
  const handleChange = (event: SelectChangeEvent) => {
    setSelectedReader(event.target.value as string);
  };
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      <Typography
        style={{
          margin: '40px',
          fontSize: '25vh',
          textShadow: '2px 2px blue',
        }}
        align='center'
        variant='h1'
      >
        הספריה
      </Typography>

      <FormControl style={{ margin: '40px', width: '50vh' }}>
        <InputLabel>בחר משתמש להתחברות</InputLabel>
        <Select value={selectedReader} label='Age' onChange={handleChange}>
          {readers.map((val: Reader) => {
            return (
              <MenuItem key={val.id} value={val.id}>
                {val.firstName} {val.lastName}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      <Button style={{ margin: '40px' }} color='success' variant='contained'>
        התחבר
      </Button>
    </div>
  );
};

export default ReadersMangement;
