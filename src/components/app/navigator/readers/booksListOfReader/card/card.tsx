import React from 'react';
import { useSelector } from 'react-redux';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';

import Book from '../../../../../../models/book';
import Reader from '../../../../../../models/reader';
import { RootState } from '../../../../../../redux/store';
import CustomCard from '../../../../../../comons/customCard/card';

const NAME: string = 'שם: ';
const ID: string = 'מזהה';
const AUTHOR: string = 'סופר: ';
interface Props {
  book: Book;
  selectFavorite: (book: Book) => void;
  deleteHandle: (id: number) => void;
  isUser: boolean;
}

const BooksListOfReader: React.FC<Props> = (props) => {
  const { book, selectFavorite, deleteHandle, isUser } = props;

  const loginUser = useSelector<RootState, Reader>(
    (state) => state.auth.loginUser
  );
  return (
    <CustomCard>
      <CardContent>
        <Typography variant='h5' component='div'>
          {ID} {book?.id}
        </Typography>
        <Typography variant='body1' component='div'>
          {NAME}
          {book?.name}. {AUTHOR} {book?.author.firstName}{' '}
          {book?.author.lastName}
        </Typography>
      </CardContent>
      {isUser && (
        <CardActions sx={{ direction: 'rtl' }}>
          <IconButton>
            <DeleteIcon
              onClick={() => deleteHandle(book?.id as number)}
              color='error'
            />
          </IconButton>
          {loginUser?.favoriteBook?.id !== book?.id ? (
            <IconButton>
              <StarBorderIcon onClick={() => selectFavorite(book)} />
            </IconButton>
          ) : (
            <IconButton onClick={() => selectFavorite(undefined)}>
              <StarIcon color='success' />
            </IconButton>
          )}
        </CardActions>
      )}
    </CustomCard>
  );
};

export default BooksListOfReader;
