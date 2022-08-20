import UserModel from '../database/models/UserModel';
import { IUserService } from '../interfaces/IUserService';

export default class UserService implements IUserService<UserModel | null> {
  findEmail = async (email: string): Promise<UserModel | null> => {
    const user = await UserModel.findOne({ where: { email } });
    if (!user) {
      const err = new Error('Incorrect email or password');
      err.name = 'Unauthorized';
      throw err;
    }
    return user;
  };
}
