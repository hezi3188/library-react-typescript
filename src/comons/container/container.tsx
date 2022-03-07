import { useStyles } from './containerStyles';

interface Props  {
  children: React.ReactNode
}
const ReadersMangement: React.FC<Props> = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.container}>{props.children}</div>
    </div>
  );
};

export default ReadersMangement;
