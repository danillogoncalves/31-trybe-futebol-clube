import TeamModel from '../database/models/TeamModel';
import MatchModel from '../database/models/MatchModel';
import { IMatchService } from '../interfaces/IMatchService';
import { IMatchGoals, IMatchReq, MatchFinish } from '../interfaces/IMatch';

export default class MatchService implements IMatchService<MatchModel> {
  findAll = async (): Promise<MatchModel[]> => {
    const matches = await MatchModel.findAll({ include: [{
      model: TeamModel,
      as: 'teamHome',
      attributes: { exclude: ['id'] },
    }, {
      model: TeamModel,
      as: 'teamAway',
      attributes: { exclude: ['id'] },
    }] });
    return matches;
  };

  findAllInProcess = async (inProgress: boolean): Promise<MatchModel[]> => {
    const matches = await MatchModel.findAll({ include: [{
      model: TeamModel,
      as: 'teamHome',
      attributes: { exclude: ['id'] },
    }, {
      model: TeamModel,
      as: 'teamAway',
      attributes: { exclude: ['id'] },
    }],
    where: { inProgress },
    });

    return matches;
  };

  create = async (body: IMatchReq): Promise<MatchModel> => {
    const {
      homeTeam,
      awayTeam,
      homeTeamGoals,
      awayTeamGoals,
    } = body;
    await this.validateTeam(homeTeam);
    await this.validateTeam(awayTeam);
    const match = await MatchModel.create({
      homeTeam,
      awayTeam,
      homeTeamGoals,
      awayTeamGoals,
      inProgress: true,
    });

    return match;
  };

  finish = async (id: number): Promise<MatchFinish> => {
    const [match] = await MatchModel.update({
      inProgress: false }, { where: { id },
    });
    if (!match) {
      const err = new Error('There is no match with such id or it\'s already been finished!');
      err.name = 'notFound';
      throw err;
    }
    return { message: 'Finished' };
  };

  updateGoals = async (id: number, body: IMatchGoals): Promise<IMatchGoals> => {
    const { homeTeamGoals, awayTeamGoals } = body;
    const [match] = await MatchModel.update({
      homeTeamGoals, awayTeamGoals }, { where: { id },
    });
    if (!match) {
      const err = new Error('There is no match with such id or the goals are the same!');
      err.name = 'notFound';
      throw err;
    }
    return body;
  };

  validateTeam = async (id: number): Promise<void> => {
    const team = await TeamModel.findByPk(id);
    if (!team) {
      const err = new Error('There is no team with such id!');
      err.name = 'notFound';
      throw err;
    }
  };
}
