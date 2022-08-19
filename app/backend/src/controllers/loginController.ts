import { Request, Response } from 'express';
import validatedLogin from '../utils/validatedLogin';
import loginService from '../services/loginService';

export default {
  login: async (req: Request, res: Response) => {
    const validad = validatedLogin.validated(req.body);
    const token = await loginService.login(validad);
    res.status(200).json({ token });
  },
  validate: async (req: Request, res: Response) => {
    const { authorization } = req.headers;
    const role = await loginService.validate(authorization as string);
    res.status(200).json({ role });
  },
};
