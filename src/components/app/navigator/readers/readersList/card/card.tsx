import React from 'react';
import { useSelector } from 'react-redux';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import Reader from '../../../../../../models/reader';
import { RootState } from '../../../../../../redux/store';
import CustomCard from '../../../../../../comons/customCard/card';

const NAME: string = 'שם: ';
const ID: string = 'מזהה';

interface Props {
  onClick: () => void;
  reader: Reader;
  deleteHandle: (reader: Reader) => void;
  editHandle: (reader: Reader) => void;
}

const BooksListOfReader: React.FC<Props> = (props) => {
  const { reader, deleteHandle, onClick, editHandle } = props;

  const loginUser = useSelector<RootState, Reader>(
    (state) => state.auth.loginUser
  );
  return (
    <CustomCard>
      <CardContent onClick={onClick}>
        <Typography variant='h5' component='div'>
          {ID} {reader?.id}
        </Typography>
        <Typography variant='body1' component='div'>
          {NAME}
          {reader?.firstName} {reader?.lastName}
        </Typography>
      </CardContent>
      <CardActions sx={{ direction: 'rtl' }}>
        {reader?.id !== loginUser?.id && (
          <IconButton onClick={() => deleteHandle(reader)}>
            <DeleteIcon color='error' />
          </IconButton>
        )}
        <IconButton onClick={() => editHandle(reader)}>
          <EditIcon />
        </IconButton>
      </CardActions>
    </CustomCard>
  );
};

export default BooksListOfReader;
