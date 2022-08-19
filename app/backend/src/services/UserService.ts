import UserModel from '../database/models/UserModel';
import { IService } from '../interfaces/IService';

export default class UserService implements IService<UserModel | null> {
  findEmail = async (email: string): Promise<UserModel | null> => {
    const user = await UserModel.findOne({ where: { email } });
    return user;
  };
}
