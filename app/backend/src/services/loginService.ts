import { IBodylogin } from '../interfaces/IBody';
import UserService from './UserService';
import passwordService from './passwordService';
import jwtService from './jwtService';
import { IUser, IUserEmail } from '../interfaces/IUser';
import UserModel from '../database/models/UserModel';

export default {
  login: async (body: IBodylogin) => {
    const { email, password } = body;
    const userService = new UserService();
    const responseUser = await userService.findEmail(email);
    if (!responseUser || !passwordService.compare(password, responseUser.password)) {
      const err = new Error('Incorrect email or password');
      err.name = 'loginError';
      throw err;
    }
    const { username, role } = responseUser;
    const token = jwtService.sign({ username, role, email } as IUser);
    return token;
  },
  validate: async (authorization: string) => {
    const data = jwtService.verify(authorization as string);
    const { email } = data as IUserEmail;
    const userService = new UserService();
    const responseUser = await userService.findEmail(email);
    const { role } = responseUser as UserModel;
    return role;
  },
};
