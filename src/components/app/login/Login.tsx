//rafc
import { useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

import { LOAD_READERS } from '../../../GraphQL/Queries';
import Reader from '../../../models/reader';
import { useStyles } from './loginStyles';
import useLogin from './useLogin';
import { ERROR_DB } from '../../../utils/strings';

const LIBRARY_TITLE: string = 'הספריה';
const CHOOSE_READER: string = 'בחר משתמש להתחברות';
const LOGIN_TITLE: string = 'התחבר';

const Login: React.FC = () => {
  const classes = useStyles();
  const { error, loading, data } = useQuery(LOAD_READERS, {
    fetchPolicy: 'network-only',
    nextFetchPolicy: 'network-only',
  });
  const [readers, setReaders] = useState<Reader[]>([]);
  const [selectedReader, setSelectedReader] = useState<number>();
  const { loginUser } = useLogin({
    readers: readers,
  });
  useEffect(() => {
    if (data) {
      setReaders(data.allReaders.nodes);
    }
  }, [data]);

  if (loading) {
    return <CircularProgress />;
  }
  if (error) {
    return <h1>{ERROR_DB}</h1>;
  }
  const handleChange = (event: SelectChangeEvent) => {
    setSelectedReader(parseInt(event.target.value));
  };

  return (
    <div className={classes.root}>
      <Typography
        className={classes.title}
        sx={{ fontSize: '25vh' }}
        align='center'
        variant='h1'
      >
        {LIBRARY_TITLE}
      </Typography>

      <FormControl className={classes.select}>
        <InputLabel>{CHOOSE_READER}</InputLabel>
        <Select
          label={CHOOSE_READER}
          value={selectedReader?.toString()}
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
      <div className={classes.loginBtn}>
        <Button
          disabled={selectedReader === undefined}
          onClick={() => {
            if (selectedReader !== undefined) {
              loginUser(selectedReader);
            }
          }}
          color='success'
          variant='contained'
        >
          {LOGIN_TITLE}
        </Button>
      </div>
    </div>
  );
};

export default Login;
