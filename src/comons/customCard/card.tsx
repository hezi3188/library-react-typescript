import Card from '@mui/material/Card';

import { useStyles } from './cardStyles';

interface Props {
  children: React.ReactNode;
}

const CustomCard: React.FC<Props> = (props) => {
  const classes = useStyles();

  return <Card className={classes.cardContainer}>{props.children}</Card>;
};

export default CustomCard;
