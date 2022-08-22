export interface IMatchService<T> {
  findAll(): Promise<T[]>,
  findAllInProcess(inProcess: boolean): Promise<T[]>,
}
