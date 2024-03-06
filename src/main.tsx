import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import { store } from './store/store.ts';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Main from './routes/main/main/Main.tsx';
import NotFound from './routes/root/NotFound.tsx';
import Boards from './routes/app/Boards.tsx';
import Board from './routes/app/Board.tsx';
import Root from './routes/root/Root.tsx';
import Features from './routes/main/Features.tsx';
import Auth from './routes/auth/Auth.tsx';
import SignIn from './routes/auth/SignIn.tsx';
import SignUp from './routes/auth/SingUp.tsx';
import App from './routes/app/App.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <NotFound />,
    children: [
      {
        element: <Main />,
        index: true,
      },
      {
        path: 'features',
        element: <Features />,
      },
    ],
  },
  {
    path: 'signin',
    element: <SignIn />,
  },
  {
    path: 'signup',
    element: <SignUp />,
  },
  {
    path: 'app',
    element: <App />,
    children: [
      {
        path: 'boards',
        element: <Boards />,
      },
      {
        path: 'board/:boardId',
        element: <Board />,
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
