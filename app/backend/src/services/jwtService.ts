import * as JWT from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { IUser } from '../interfaces/IUser';

dotenv.config();

const SECRET = process.env.JWT_SECRET;
export default {
  sign: (user: IUser) => {
    const token = JWT.sign(user, SECRET as string);
    return token;
  },
  verify: (token: string) => {
    try {
      const data = JWT.verify(token, SECRET as string);
      return data;
    } catch (_error) {
      const err = new Error('Token must be a valid token');
      err.name = 'Unauthorized';
      throw err;
    }
  },
};
