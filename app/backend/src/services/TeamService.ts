import { ITeamSercive } from '../interfaces/ITeamSercive';
import TeamModel from '../database/models/TeamModel';

export default class TeamService implements ITeamSercive<TeamModel> {
  findAll = async (): Promise<TeamModel[]> => {
    const teams: TeamModel[] = await TeamModel.findAll();
    return teams;
  };
}
