import TeamModel from '../database/models/TeamModel';
import MatchModel from '../database/models/MatchModel';
import { IMatchService } from '../interfaces/IMatchService';

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
}
