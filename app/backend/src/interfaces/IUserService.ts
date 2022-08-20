export interface IUserService<T> {
  findEmail(email: string): Promise<T>,
}
