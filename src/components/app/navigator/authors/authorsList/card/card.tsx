import React from 'react';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import CustomCard from '../../../../../../comons/customCard/card';
import { Author } from '../../../../../../models/author';

const NAME: string = 'שם: ';
const ID: string = 'מזהה';

interface Props {
  onClick: () => void;
  author: Author;
  handleDelete: (author: Author) => void;
  handleEdit: (author: Author) => void;
}

const Card: React.FC<Props> = (props) => {
  const { author, handleDelete, onClick, handleEdit } = props;

  return (
    <CustomCard>
      <CardContent onClick={onClick}>
        <Typography sx={{ fontSize: '3.5vh' }} variant='h5' component='div'>
          {` ${ID} ${author?.id}`}
        </Typography>
        <Typography sx={{ fontSize: '2vh' }} variant='body1' component='div'>
          {`${NAME} ${author?.firstName} ${author?.lastName}`}
        </Typography>
      </CardContent>
      <CardActions sx={{ direction: 'rtl' }}>
        <IconButton onClick={() => handleDelete(author)}>
          <DeleteIcon sx={{ height: '4vh' }} color='error' />
        </IconButton>
        <IconButton onClick={() => handleEdit(author)}>
          <EditIcon sx={{ height: '4vh' }} />
        </IconButton>
      </CardActions>
    </CustomCard>
  );
};

export default Card;
