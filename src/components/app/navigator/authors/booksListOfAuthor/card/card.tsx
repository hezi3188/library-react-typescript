import React from 'react';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import Book from '../../../../../../models/book';
import CustomCard from '../../../../../../comons/customCard/card';

const NAME: string = 'שם: ';
const ID: string = 'מזהה';

interface Props {
  book: Book;
}

const BooksListOfReader: React.FC<Props> = (props) => {
  const { book } = props;

  return (
    <CustomCard>
      <CardContent>
        <Typography sx={{ fontSize: '3.5vh' }} variant='h5' component='div'>
          {`${ID} ${book?.id}`}
        </Typography>
        <Typography sx={{ fontSize: '2vh' }} variant='body1' component='div'>
          {`${NAME} ${book?.name}`}
        </Typography>
      </CardContent>
    </CustomCard>
  );
};

export default BooksListOfReader;
