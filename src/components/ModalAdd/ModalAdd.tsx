import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useCreateBoardMutation } from '../../store/service/boardApi';
import { TextField } from '@mui/material';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

const ModalAdd = ({
  title,
  btnSubmit,
  btnCancel,
  handleClick,
}: //open,
{
  title: string;
  btnSubmit: string;
  btnCancel: string;
  handleClick: () => void;
  open: boolean;
}) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const [open, setOpen] = useState(true);
  const id = useSelector((state: RootState) => state.user.id);
  const [todoNew, setTodoNew] = useState('');
  
  const [createBoard, { isLoading: isLoadingCreate }] = useCreateBoardMutation();
  const handleSubmit = async () => {
    const body = { userId: id, todo: todoNew, completed: false };
    const result = await createBoard(body).unwrap();
    console.log(result);
    if (result) setOpen(false);
  };

  return (
    <>
      <>{isLoadingCreate && 'Данные отправляются'}</>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        fullWidth={true}
        maxWidth="xs"
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle
          id="responsive-dialog-title"
          sx={{ fontWeight: 'bold', textAlign: 'center', pt: 5 }}
        >
          {title}
        </DialogTitle>
        <DialogActions sx={{ display: 'flex', justifyContent: 'center', pb: 3 }}>
          <TextField
            id="outlined-basic"
            label="Outlined"
            variant="outlined"
            onChange={(e) => setTodoNew(e.target.value)}
          />
          <Button onClick={handleSubmit} variant="contained" color="error">
            {btnSubmit}
          </Button>
          <Button onClick={handleClick} variant="outlined">
            {btnCancel}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ModalAdd;
