export interface IService<T> {
  findEmail(email: string): Promise<T>
}
