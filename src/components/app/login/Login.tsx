//rafc
import { useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { useDispatch } from 'react-redux';
import Button from '@mui/material/Button';
import Reader from '../../../models/reader';
import { LOAD_READERS } from '../../../GraphQL/Queries';
import { login } from '../../../redux/auth';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const { error, loading, data } = useQuery(LOAD_READERS);
  const [readers, setReaders] = useState<Reader[]>([]);
  const [selectedReader, setSelectedReader] = useState<number>();
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
    setSelectedReader(parseInt(event.target.value));
    console.log(event.target.value);
  };
  const loginUserHandle = () => {
    dispatch(
      login(
        readers.filter(
          (item) => item !== undefined && item.id === selectedReader
        )[0]
      )
    );
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
        <Select
          value={selectedReader?.toString()}
          label='בחר משתמש להתחברות'
          onChange={handleChange}
        >
          {readers.map((val: Reader) => {
            if (val !== undefined) {
              return (
                <MenuItem key={val.id} value={val.id}>
                  {val.firstName} {val.lastName}
                </MenuItem>
              );
            }
          })}
        </Select>
      </FormControl>
      <Button
        disabled={selectedReader === undefined}
        onClick={loginUserHandle}
        style={{ margin: '40px' }}
        color='success'
        variant='contained'
      >
        התחבר
      </Button>
    </div>
  );
};

export default Login;
