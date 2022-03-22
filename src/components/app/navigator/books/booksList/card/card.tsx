import React from 'react';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import CustomCard from '../../../../../../comons/customCard/card';
import Book from '../../../../../../models/book';

const NAME: string = 'שם: ';
const ID: string = 'מזהה';
const AUTHOR: string = 'סופר: ';

interface Props {
  onClick: () => void;
  book: Book;
  handleDelete: (book: Book) => void;
  handleEdit: (book: Book) => void;
}

const Card: React.FC<Props> = (props) => {
  const { book, handleDelete, onClick, handleEdit } = props;

  return (
    <CustomCard>
      <CardContent onClick={onClick}>
        <Typography sx={{ fontSize: '3.5vh' }} variant='h5' component='div'>
          {` ${ID} ${book?.id}`}
        </Typography>
        <Typography sx={{ fontSize: '2vh' }} variant='body1' component='div'>
          {`${NAME} ${book?.name}. ${AUTHOR} ${book?.author.firstName} ${book?.author.lastName}`}
        </Typography>
      </CardContent>
      <CardActions sx={{ direction: 'rtl' }}>
        <IconButton onClick={() => handleDelete(book)}>
          <DeleteIcon sx={{ height: '4vh' }} color='error' />
        </IconButton>
        <IconButton onClick={() => handleEdit(book)}>
          <EditIcon sx={{ height: '4vh' }} />
        </IconButton>
      </CardActions>
    </CustomCard>
  );
};

export default Card;
