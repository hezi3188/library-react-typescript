import { useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { useSelector, useDispatch } from 'react-redux';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Reader from '../../../../models/reader';
import { LOAD_READERS } from '../../../../GraphQL/Queries';
import { RootState } from '../../../../redux/store';
import { login, logOut } from '../../../../redux/auth';
import { useStyles } from './readersMangementStyles';
import Container from '../../../../comons/container/container';
import CustomCard from '../../../../comons/customCard/card';
const ReadersMangement: React.FC = () => {
  const classes = useStyles();
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
    <div className={classes.root}>
      <Container>
        {readers.map((val: Reader) => {
          if (val !== undefined) {
            return (
              <CustomCard>
                <CardContent>
                  <Typography variant='h5' component='div'>
                    מזהה: {val.id}
                  </Typography>
                  <Typography variant='body1' component='div'>
                    שם: {val.firstName} {val.lastName}
                  </Typography>
                </CardContent>
                <CardActions sx={{ direction: 'rtl' }}>
                  <IconButton>
                    <DeleteIcon color='error' />
                  </IconButton>
                  <IconButton>
                    <EditIcon />
                  </IconButton>
                </CardActions>
              </CustomCard>
            );
          }
        })}
      </Container>
      <Container>
        {readers.map((val: Reader) => {
          if (val !== undefined) {
            return (
              <CustomCard>
                <CardContent>
                  <Typography variant='h5' component='div'>
                    מזהה: {val.id}
                  </Typography>
                  <Typography variant='body1' component='div'>
                    שם: {val.firstName} {val.lastName}
                  </Typography>
                </CardContent>
                <CardActions sx={{ direction: 'rtl' }}>
                  <IconButton>
                    <DeleteIcon color='error' />
                  </IconButton>
                  <IconButton>
                    <EditIcon />
                  </IconButton>
                </CardActions>
              </CustomCard>
            );
          }
        })}
      </Container>
    </div>
  );
};

export default ReadersMangement;
