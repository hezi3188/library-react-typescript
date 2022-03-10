//rafce
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import { useStyles } from './confirmDialogStyles';
interface Props {
  open: boolean;
  title: string;
  message: string;
  onClose: () => void;
  onConfirm: () => void;
  onCancel: () => void;
}
const AddBookDialog: React.FC<Props> = (props) => {
  const { open, onClose, onConfirm, onCancel, title, message } = props;
  const classes = useStyles();

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{message}</DialogContent>
      <DialogActions>
        <Button onClick={onConfirm}>אישור</Button>
        <Button onClick={onCancel}>ביטול</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddBookDialog;
