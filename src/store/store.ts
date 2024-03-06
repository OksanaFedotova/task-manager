import { configureStore } from '@reduxjs/toolkit';
import { authAPI } from './service/authApi';
import userSlice from './slices/userSlice';
import { boardAPI } from './service/boardApi';
import authSlice from './slices/authSlice';

const setupStore = () =>
  configureStore({
    reducer: {
      [authAPI.reducerPath]: authAPI.reducer,
      [boardAPI.reducerPath]: boardAPI.reducer,
      user: userSlice,
      auth: authSlice,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(authAPI.middleware, boardAPI.middleware),
  });

export const store = setupStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
