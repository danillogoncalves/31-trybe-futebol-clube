import { IMatchReq, MatchFinish } from './IMatch';

export interface IMatchService<T> {
  findAll(): Promise<T[]>,
  findAllInProcess(inProcess: boolean): Promise<T[]>,
  create(body: IMatchReq): Promise<T>,
  finish(id: number): Promise<MatchFinish>,
}
