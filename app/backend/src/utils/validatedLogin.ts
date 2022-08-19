import * as JOI from 'joi';
import { IBodylogin } from '../interfaces/IBody';

const schema = JOI.object({
  email: JOI.string().required(),
  password: JOI.string().required(),
}).messages(
  {
    'any.required': 'All fields must be filled',
    'string.empty': 'All fields must be filled',
  },
);

export default {
  validated: (body: IBodylogin): IBodylogin => {
    const { error, value } = schema.validate(body);
    if (error) throw error;
    return value;
  },
};
