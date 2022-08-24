import * as express from 'express';
import LeaderboardsController from '../controllers/LeaderboardsController';
import LeaderboardsService from '../services/LeaderboardsService';

const leaderboardRoute = express.Router();

const leaderboardsService = new LeaderboardsService();
const leaderboardsController = new LeaderboardsController(leaderboardsService);

leaderboardRoute.get('/home', leaderboardsController.getLeaderboard);
leaderboardRoute.get('/away', leaderboardsController.getLeaderboard);

export default leaderboardRoute;
