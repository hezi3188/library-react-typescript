import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: '4px',
    height: '90%',
    width: '98%',
  },
  upContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  select: {
    margin: '40px',
    width: '50vh',
    '& *': {
      margin: '4px',
    },
  },
});
