import UserModel from '../database/models/UserModel';
import { IUserService } from '../interfaces/IUserService';

export default class UserService implements IUserService<UserModel | null> {
  findEmail = async (email: string): Promise<UserModel | null> => {
    const user = await UserModel.findOne({ where: { email } });
    return user;
  };
}
