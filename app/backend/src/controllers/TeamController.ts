import { Request, Response } from 'express';
import TeamModel from '../database/models/TeamModel';
import { ITeamSercive } from '../interfaces/ITeamSercive';

export default class TeamController {
  constructor(private teamService: ITeamSercive<TeamModel>) { }

  findAll = async (_req: Request, res: Response): Promise<void> => {
    const teams = await this.teamService.findAll();
    res.status(200).json(teams);
  };

  findByPk = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const team = await this.teamService.findByPk(Number(id));
    res.status(200).json(team);
  };
}
