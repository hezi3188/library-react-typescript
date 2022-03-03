import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles({
  title: {
    textShadow: '2px 2px blue',
  },
  upMenuContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  upMenuLeft: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    '& *': {
      margin: '4px',
    },
  },
  loginOutput: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
});
