import { Request, Response } from 'express';
import LeaderboardsService from '../services/LeaderboardsService';

export default class LeaderboardsController {
  constructor(private leaderboardsService: LeaderboardsService) {}

  getLeaderboard = async (req: Request, res: Response) => {
    const { path } = req;
    const result = await this.leaderboardsService.getLeaderboard(path);
    res.status(200).json(result);
  };
}
