export interface ITeamSercive<T> {
  findAll(): Promise<T[]>,
}
