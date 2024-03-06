export interface IUserRequest {
  login: string;
  password: string;
  email: string;
}
export interface IUserResponse {
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  token: string;
  id: string;
  image: string;
  gender: string;
}

export interface ISignupRequest {
  name?: string;
  login: string;
  password: string;
}
export type TSigninRequest = Omit<ISignupRequest, 'name'>;
