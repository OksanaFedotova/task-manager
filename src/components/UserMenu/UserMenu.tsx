import { useNavigate } from 'react-router-dom';
import { useGetUserQuery } from '../../store/service/authApi';
import { Box, Button, Card, LinearProgress, Typography } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { initialState, setUser } from '../../store/slices/userSlice';
import { useEffect } from 'react';
import { RootState } from '../../store/store';
import { setAuth } from '../../store/slices/authSlice';
import RedirectToAuth from '../RedirectToAuth/RedirectToAuth';

export default function UserMenu() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data, isLoading, error } = useGetUserQuery(null);
  if (error) {
    if ('status' in error) {
      const errMsg = 'error' in error ? error.error : JSON.stringify(error.data);
      toast(errMsg);
    }
  }
  useEffect(() => {
    if (data) {
      const { id, username, email, firstName, lastName, token, image, gender } = data;
      dispatch(setUser({ id, username, email, firstName, lastName, token, image, gender }));
    }
  }, [data, dispatch]);
  const isAuth = useSelector((state: RootState) => state.auth.isAuth);
  return (
    <>
      {!isLoading && !isAuth && <RedirectToAuth />}
      {!isLoading && isAuth && (
        <>
          {isLoading && <LinearProgress />}
          {error && <ToastContainer />}
          {data && (
            <Box>
              {
                <Card sx={{ minWidth: 275 }}>
                  {Object.entries(data)
                    .slice(0, 9)
                    .map(([key, value]) => {
                      if (typeof value === 'string') {
                        return (
                          <Typography>
                            {key}: {value}{' '}
                          </Typography>
                        );
                      }
                    })}
                </Card>
              }
              <Button
                onClick={() => {
                  localStorage.removeItem('token');
                  dispatch(setUser(initialState));
                  dispatch(setAuth(false));
                  navigate('/', { replace: true });
                }}
              >
                Выйти
              </Button>
            </Box>
          )}{' '}
        </>
      )}
    </>
  );
}
