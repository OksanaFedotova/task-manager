const token = localStorage.getItem('token');
const fetchTodos = async () => {
  const response = await fetch('https://dummyjson.com/auth/todos', {
    method: 'GET' /* or POST/PUT/PATCH/DELETE */,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  return data.todos;
};
const fetchTodoById = async (id) => {
  const response = await fetch(`https://dummyjson.com/todo/${id}`);
  const data = await response.json();
  console.log(data);
  return data;
};
//const
// fetch('https://dummyjson.com/products/1', {
//   method: 'PUT', /* or PATCH */
//   headers: { 'Content-Type': 'application/json' },
//   body: JSON.stringify({
//     title: 'iPhone Galaxy +1'
//   })
// })
// .then(res => res.json())
// .then(console.log);
const deleteTodoById = async (id) => {
  const response = await fetch(`https://dummyjson.com/todo/${id}`, {
    method: 'DELETE',
  });
  const data = await response.json();
  console.log(data);
  return data;
};
export { fetchTodos, fetchTodoById, deleteTodoById };
