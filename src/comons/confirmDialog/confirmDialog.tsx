import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

interface Props {
  open: boolean;
  title: string;
  message: string;
  onClose: () => void;
  onConfirm: () => void;
  onCancel?: () => void;
}

const ConfirmDialog: React.FC<Props> = (props) => {
  const { open, onClose, onConfirm, onCancel, title, message } = props;

  const handleOnConfirm = () => {
    onConfirm();
    onClose();
  };

  const handleOnCancel = () => {
    if (onCancel) {
      onCancel();
    }
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{message}</DialogContent>
      <DialogActions>
        <Button onClick={handleOnConfirm}>אישור</Button>
        <Button onClick={handleOnCancel}>ביטול</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
