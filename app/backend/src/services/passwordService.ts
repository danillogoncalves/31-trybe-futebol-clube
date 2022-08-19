import { /* hashSync, */ compareSync } from 'bcryptjs';

export default {
  // hash: (password: string) => {
  //   // const salt = bcrypt.genSaltSync(5);
  //   const hash = hashSync(password, 12);
  //   return hash;
  // },
  compare: (password: string, hash: string) => compareSync(password, hash),
};
