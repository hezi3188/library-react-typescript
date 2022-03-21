import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles({
  root: {
    border: '1px solid',
    margin: '4px',
  },
  menu: {
    height: '10vh',
    border: '1px solid',
  },
  container: {
    height: '88vh',
    display: 'flex',
    flexDirection: 'row',
  },
  rightContainer: {
    border: '1px solid',
    width: '10%',
  },
  leftContainer: {
    width:"90%"
  },
});
