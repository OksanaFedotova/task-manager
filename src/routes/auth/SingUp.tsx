import { toast, ToastContainer } from 'react-toastify';
import { useSignupMutation } from '../../store/service/authApi';
import Form from '../../components/Form/Form';

export default function SignUp() {
  const [signup, { isLoading, isError }] = useSignupMutation();
  return (
    <>
      <>{isError && <>{toast.error('ошибка')}</>}</>
      <>{isLoading && 'Данные загружаются'}</>
      <ToastContainer />
      <p>Регистрация</p>
      <Form signup={signup} />
    </>
  );
}
