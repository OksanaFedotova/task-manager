import { useNavigate } from 'react-router-dom';
import { useDeleteBoardMutation, useGetAllBoardsQuery } from '../../store/service/boardApi';
import { ToastContainer, toast } from 'react-toastify';
import { Box, Button, LinearProgress } from '@mui/material';
import CardTodo from './CardTodo';
import { useState } from 'react';
import ModalAdd from '../../components/ModalAdd/ModalAdd';
import { RootState } from '../../store/store';
import { useSelector } from 'react-redux';

export default function Boards() {
  const navigate = useNavigate();
  const { error, data, isLoading } = useGetAllBoardsQuery(null);
  if (error) {
    if ('status' in error) {
      const errMsg = 'error' in error ? error.error : JSON.stringify(error.data);
      toast(errMsg);
    }
  }
  const [modal, setModal] = useState(false);
  const isAuth = useSelector((state: RootState) => state.auth.isAuth);
  const [deleteBoard, {isLoading: isLoadingDelete, error: errorDelete}] = useDeleteBoardMutation()
  const handleClick = (id) => {
    deleteBoard(id)
  }
  return (
    <>
     {!isLoading && isAuth && (
        <>
          {isLoading && <LinearProgress />}
          {error && <ToastContainer />}
          {data && (
            <>
              <>
                {modal && (
                  <ModalAdd
                    title={'Добавить задачу'}
                    btnSubmit={'Отправить'}
                    btnCancel={'Отменить'}
                    open={true}
                    handleClick={() => setModal(false)}
                  />
                )}
              </>
              <Button onClick={() => setModal(true)}>Добавить</Button>
              <>
                {data.todos.map(({ todo, completed, id }) => (
                  <Box
                    key={id}
                    onClick={(e) => {
                      if (
                        (e.target as HTMLButtonElement).type !== 'button' &&
                        (e.target as HTMLInputElement).type !== 'checkbox'
                      ) {
                        navigate(`../board/${id}`);
                      }
                    }}
                  >
                    <CardTodo handleClick={() => handleClick(id)} todo={todo} completed={completed} />
                  </Box>
                ))}
              </>
            </>
          )}
        </>
        )} 
    </>
  );
}
//to={`../board/${id}`}
