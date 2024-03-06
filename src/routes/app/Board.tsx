import { useParams } from 'react-router-dom';
import { useDeleteBoardMutation, useEditBoardMutation, useGetBoardByIdQuery } from '../../store/service/boardApi';
import { Button, Checkbox, LinearProgress } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

export default function Board() {
  const { boardId } = useParams();
  const { data, error, isLoading } = useGetBoardByIdQuery(boardId);
  if (error) {
    if ('status' in error) {
      const errMsg = 'error' in error ? error.error : JSON.stringify(error.data);
      toast(errMsg);
    }
  }
  const isAuth = useSelector((state: RootState) => state.auth.isAuth);
  const [editBoard] = useEditBoardMutation();
  const handleClick = async () => {
    const result = await editBoard({id: boardId, completed: !data.completed}).unwrap()
    console.log(result);
  }
  return (
    <>
      {!isLoading && isAuth && (
        <>
          {isLoading && <LinearProgress />}
          {error && <ToastContainer />}
          {data && (
            <div>
              {data.todo}
              <Checkbox onClick={handleClick} checked={data.completed} />
            </div>
          )}
        </>
      )}
    </>
  );
}
