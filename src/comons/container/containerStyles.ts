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
  container: {
    overflowY: 'auto',
    margin: '0 auto',
    flexDirection: 'column',
    alignItems: 'center',
    width: '80%',
  },
});