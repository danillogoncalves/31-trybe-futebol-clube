export interface ITeamSercive<T> {
  findAll(): Promise<T[]>,
  findByPk(id: number): Promise<T>,
}
