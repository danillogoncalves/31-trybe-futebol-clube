import { ITeamSercive } from '../interfaces/ITeamSercive';
import TeamModel from '../database/models/TeamModel';

export default class TeamService implements ITeamSercive<TeamModel> {
  findAll = async (): Promise<TeamModel[]> => {
    const teams: TeamModel[] = await TeamModel.findAll();
    return teams;
  };

  findByPk = async (id: number): Promise<TeamModel> => {
    const team = await TeamModel.findByPk(id);
    if (!team) {
      const err = new Error('There is no team with such id!');
      err.name = 'notFound';
      throw err;
    }
    return team;
  };
}
