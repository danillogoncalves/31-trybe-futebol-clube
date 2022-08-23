import { Request, Response } from 'express';
import MatchService from '../services/MatchService';
import jwtService from '../services/jwtService';

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

  create = async (req: Request, res: Response): Promise<void> => {
    const { homeTeam, awayTeam } = req.body;
    const { authorization } = req.headers;
    if (!authorization) throw new Error();
    jwtService.verify(authorization as string);
    if (homeTeam === awayTeam) {
      const err = new Error('It is not possible to create a match with two equal teams');
      err.name = 'Unauthorized';
      throw err;
    }
    const match = await this.matchService.create(req.body);
    res.status(201).json(match);
  };

  finish = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const finished = await this.matchService.finish(Number(id));
    res.status(200).json(finished);
  };
}
