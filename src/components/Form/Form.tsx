import { Button, LinearProgress, TextField } from '@mui/material';
import { useForm, SubmitHandler, SubmitErrorHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import styles from './form.module.css';
import { useDispatch } from 'react-redux';
import { useSigninMutation } from '../../store/service/authApi';
import { setUser } from '../../store/slices/userSlice';
import { ToastContainer, toast } from 'react-toastify';
import { BaseQueryFn, TypedMutationTrigger } from '@reduxjs/toolkit/query/react';
import 'react-toastify/dist/ReactToastify.css';
import { IUserRequest, IUserResponse } from '../../interfaces/users';
import { isErrorWithMessage, isFetchBaseQueryError } from '../../store/service/helpers';
import { setAuth } from '../../store/slices/authSlice';

type Inputs = {
  email: string;
  password: string;
  name: string;
};

export default function Form({
  signup,
}: {
  signup: TypedMutationTrigger<IUserResponse, IUserRequest, BaseQueryFn>;
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ mode: 'onChange' });
  const [signin, { isLoading }] = useSigninMutation();
  
  const onSubmit: SubmitHandler<Inputs> = async (dataUser) => {
    const { name: login, password, email } = dataUser;
    if (signup) {
      try {
        await signup({ login, password, email }).unwrap();
      } catch (err) {
        if (isFetchBaseQueryError(err)) {
          // you can access all properties of `FetchBaseQueryError` here
          const errMsg = 'error' in err ? err.error : JSON.stringify(err.data);
          toast(errMsg);
        } else if (isErrorWithMessage(err)) {
          toast(err.message);
        }
      }
    }
    try {
      const data = await signin({ login, password }).unwrap();
      dispatch(setUser(data));
      dispatch(setAuth(true));
      localStorage.setItem('token', data.token);
      navigate('/app/boards');
    } catch (err) {
      if (isFetchBaseQueryError(err)) {
        // you can access all properties of `FetchBaseQueryError` here
        const errMsg = 'error' in err ? err.error : JSON.stringify(err.data);
        toast(errMsg);
      } else if (isErrorWithMessage(err)) {
        toast(err.message);
      }
    }
  };

  const onInvalid: SubmitErrorHandler<Inputs> = () => {
    Object.entries(errors).map(([type, { message }]) => {
      toast(`${type}: ${message}`);
    });
  };

  return (
    <>
      {isLoading && <LinearProgress />}
      <ToastContainer />
      <form className={styles.form} onSubmit={handleSubmit(onSubmit, onInvalid)}>
        <TextField label="имя" {...register('name', { required: true })} />
        <TextField
          label={errors.email?.message || 'email'}
          {...register('email', {
            required: true,
            pattern: {
              value:
                /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: 'Введите корректный email',
            },
          })}
        />
        <TextField
          label={errors.password?.message || 'пароль'}
          {...register('password', {
            required: true,
            pattern: {
              value: /(?=^.{6,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
              message: 'Пароль некорректный',
            },
            minLength: {
              value: 6,
              message: 'Пароль слишком короткий',
            },
            maxLength: {
              value: 20,
              message: 'Пароль слишком длинный',
            },
          })}
        />
        <Button type="submit">Отправить</Button>
      </form>
    </>
  );
}
