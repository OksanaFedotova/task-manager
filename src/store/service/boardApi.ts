import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import host from '../../apiFake/host';
import User from '../../apiFake/users';
import { setAuth } from '../slices/authSlice';
export interface IBoard {
  id: number;
  todo: string;
  completed: boolean;
  userId: string;
}

const baseQuery = fetchBaseQuery({
  baseUrl: `${host}`,
  prepareHeaders: (headers) => {
    const token = localStorage.getItem('token');
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    } 
    return headers;
  },
});
export const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.data) {
    api.dispatch(setAuth(true));
  }
  if (result.error && result.error.status === 401) {
    // try to get a new token
    const refreshResult = await User.signInUser({ login: '', password: '' });
    if (refreshResult) {
      // store the new token
      localStorage.setItem('token', refreshResult.token);
      api.dispatch(setAuth(true));
      // retry the initial query
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(setAuth(false));
      //document.location.href = 'http://localhost:5173/';
    }
  }
  return result;
};
export const boardAPI = createApi({
  reducerPath: 'boardApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Boards', 'Board'],
  endpoints: (builder) => ({
    getAllBoards: builder.query<{ todos: IBoard[] }, null>({
      query: () => 'auth/todos',
      providesTags: ['Boards'],
    }),
    getBoardById: builder.query({
      query: (id) => `auth/todos/${id}`,
      providesTags: ['Board'],
    }),
    createBoard: builder.mutation({
      query: (body) => ({
        url: 'auth/todos/add',
        method: 'POST',
        body: body,
      }),
      invalidatesTags: ['Boards'],
    }),
    deleteBoard: builder.mutation({
      query: (id) => ({
        url: `auth/todos/${id}`,
        method: 'DELETE',
      }),
       invalidatesTags: ['Boards'],
    }),
    editBoard: builder.mutation({
      query: ({id, body}) => ({
        url: `auth/todos/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Board', 'Boards'],
    })
  }),
});

export const {
  useGetAllBoardsQuery,
  useGetBoardByIdQuery,
  useCreateBoardMutation,
  useDeleteBoardMutation,
  useEditBoardMutation
} = boardAPI;
