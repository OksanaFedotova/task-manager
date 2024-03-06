import { createSlice } from '@reduxjs/toolkit';
import { IUserResponse } from '../../interfaces/users';

// export interface IUserState {
//   user: IUserResponse;
// }
export const initialState: IUserResponse = {
  id: '',
  username: '',
  email: '',
  firstName: '',
  lastName: '',
  token: '',
  image: '',
  gender: '',
};

export const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state = Object.assign({}, state, action.payload);
      return state;
    },
  },
});

export const { setUser } = slice.actions;
export default slice.reducer;
