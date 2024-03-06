import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import host from '../../apiFake/host';
import { IUserResponse, TSigninRequest } from '../../interfaces/users';
import { baseQueryWithReauth } from './boardApi';
const body = {
  username: 'kminchelle',
  password: '0lelplR',
  // expiresInMins: 60, // optional
};

export const authAPI = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    signin: builder.mutation<IUserResponse, TSigninRequest>({
      query: ({ login, password }) => ({
        url: 'auth/login',
        method: 'POST',
        body: body,
      }),
    }),
    signup: builder.mutation<IUserResponse, TSigninRequest>({
      query: (body) => ({
        url: 'users/add',
        method: 'POST',
        body: body,
      }),
    }),
    getUser: builder.query<IUserResponse, null>({
      query: () => ({
        url: 'auth/me',
        // headers: { Authorization: `Bearer ${token}` },
      }),
    }),
  }),
});

export const { useSigninMutation, useSignupMutation, useGetUserQuery } = authAPI;
