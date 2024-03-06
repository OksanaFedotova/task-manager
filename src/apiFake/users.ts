import { IUserSignUp } from '../interfaces/users';
import host from './host';

export default class User {
  static async signUpUser({ login, password, email }: IUserSignUp) {
    return await fetch(`${host}/products/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: 'kminchelle',
        password: '0lelplR',
      }),
    }).then((res) => res.json());
  }
  static async signInUser({ login, password }: Pick<IUserSignUp, 'login' | 'password'>) {
    const res = await fetch(`${host}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: 'kminchelle',
        password: '0lelplR',
      }),
    });
    const result = await res.json();
    return result;
  }
}
