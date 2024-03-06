import { Button, Card, CardActions, CardContent, Checkbox, Typography } from '@mui/material';

export default function CardTodo({ todo, completed, handleClick }: { todo: string; completed: boolean; handleClick: () => void }) {
  return (
    <Card variant="outlined">
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {todo}
        </Typography>
      </CardContent>
      <Checkbox checked={completed} />
      <CardActions>
        <Button onClick={handleClick} size="small">Удалить</Button>
      </CardActions>
    </Card>
  );
}
