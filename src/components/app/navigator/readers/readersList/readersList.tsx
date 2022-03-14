import { useQuery } from '@apollo/client';
import { useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import ConfirmDialog from '../../../../../comons/confirmDialog/confirmDialog';
import EditReaderDialog from './editReaderDialog/editReaderDialog';
import Reader from '../../../../../models/reader';
import { LOAD_READERS } from '../../../../../GraphQL/Queries';
import { RootState } from '../../../../../redux/store';
import { useStyles } from './readersListStyles';
import Container from '../../../../../comons/container/container';
import CustomCard from '../../../../../comons/customCard/card';
import { ERROR_DB } from '../../../../../utils/strings';
import useReadersList from './useReadersList';

const DELETE_DIALOG_TITLE: string = 'זהירות!';
const DELETE_DIALOG_MESSAGE: string = 'האם אתה בטוח שברצונך למחוק?';

interface Props {
  getReaderData: (reader: Reader) => void;
}

const ReadersList: React.FC<Props> = (props) => {
  const classes = useStyles();
  const { getReaderData } = props;
  const loginUser = useSelector<RootState, Reader>(
    (state) => state.auth.loginUser
  );
  const { error, loading, data } = useQuery(LOAD_READERS);
  const [readers, setReaders] = useState<Reader[]>([]);
  const [selectedReader, setSelectedReader] = useState<Reader>();
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
  const [openEditDialog, setEditAddDialog] = useState<boolean>(false);

  const { deleteReader } = useReadersList({
    readers: readers,
    setReaders: setReaders,
  });

  const handleEdit = (r: Reader) => {
    setEditAddDialog(true);
    setSelectedReader(r);
  };
  const handleDelete = (r: Reader) => {
    setOpenDeleteDialog(true);
    setSelectedReader(r);
  };

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
  return (
    <div className={classes.root}>
      <EditReaderDialog
        reader={selectedReader}
        open={openEditDialog}
        onClose={() => setEditAddDialog(false)}
      />
      <ConfirmDialog
        open={openDeleteDialog}
        title={DELETE_DIALOG_TITLE}
        message={DELETE_DIALOG_MESSAGE}
        onClose={() => setOpenDeleteDialog(false)}
        onConfirm={() => deleteReader(selectedReader?.id as number)}
      />
      <Container>
        {readers.map((val: Reader) => {
          if (val !== undefined) {
            return (
              <CustomCard key={val.id}>
                <CardContent onClick={() => getReaderData(val)}>
                  <Typography variant='h5' component='div'>
                    מזהה: {val.id}
                  </Typography>
                  <Typography variant='body1' component='div'>
                    שם: {val.firstName} {val.lastName}
                  </Typography>
                </CardContent>
                <CardActions sx={{ direction: 'rtl' }}>
                  {val.id !== loginUser?.id && (
                    <IconButton onClick={() => handleDelete(val)}>
                      <DeleteIcon color='error' />
                    </IconButton>
                  )}
                  <IconButton onClick={() => handleEdit(val)}>
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

export default ReadersList;
