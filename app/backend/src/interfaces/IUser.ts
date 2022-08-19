export interface IUserEmail {
  email: string;
}

export interface IUser extends IUserEmail {
  id: number;
  username: string;
  role: string;
  password: string;
}
