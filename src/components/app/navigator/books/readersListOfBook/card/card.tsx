import React from 'react';
import { useSelector } from 'react-redux';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

import Reader from '../../../../../../models/reader';
import { RootState } from '../../../../../../redux/store';
import CustomCard from '../../../../../../comons/customCard/card';

const NAME: string = 'שם: ';
const ID: string = 'מזהה';

interface Props {
  reader: Reader;
  handleDelete: (id: number) => void;
}

const Card: React.FC<Props> = (props) => {
  const { reader, handleDelete } = props;

  const loginUser = useSelector<RootState, Reader>(
    (state) => state.auth.loginUser
  );
  return (
    <CustomCard>
      <CardContent>
        <Typography sx={{ fontSize: '3.5vh' }} variant='h5' component='div'>
          {`${ID} ${reader?.id}`}
        </Typography>
        <Typography sx={{ fontSize: '2vh' }} variant='body1' component='div'>
          {`${NAME}  ${reader?.firstName} ${reader?.lastName}`}
        </Typography>
      </CardContent>
      <CardActions sx={{ direction: 'rtl' }}>
        {loginUser?.id === reader?.id && (
          <IconButton>
            <DeleteIcon
              sx={{ height: '4vh' }}
              onClick={() => handleDelete(reader?.id as number)}
              color='error'
            />
          </IconButton>
        )}
      </CardActions>
    </CustomCard>
  );
};

export default Card;
