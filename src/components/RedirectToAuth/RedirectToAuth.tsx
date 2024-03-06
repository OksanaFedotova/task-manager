import { Button, Card, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function RedirectToAuth() {
  const navigate = useNavigate();
  return (
    <Card>
      <Typography>Нужно авторизоваться</Typography>
      <Button onClick={() => navigate('../signin')}>Перейти</Button>
    </Card>
  );
}
