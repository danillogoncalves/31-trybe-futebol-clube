import { Request, Response } from 'express';
import MatchService from '../services/MatchService';

export default class MatchController {
  constructor(private matchService: MatchService) {}
  findAll = async (req: Request, res: Response): Promise<void> => {
    if (req.query.inProgress) await this.findAllInProcess(req, res);
    const matches = await this.matchService.findAll();
    res.status(200).json(matches);
  };

  findAllInProcess = async (req: Request, res: Response): Promise<void> => {
    const { inProgress } = req.query;
    const matches = await this.matchService.findAllInProcess(JSON.parse(inProgress as string));
    res.status(200).json(matches);
  };
}
