import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    // height: '100vh',
  },
  title: {
    margin: '40px',
    textShadow: '2px 2px blue',
  },
  select: { margin: '40px', width: '50vh' },
  loginBtn: { margin: '40px' },
});
