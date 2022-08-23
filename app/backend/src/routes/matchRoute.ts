import * as express from 'express';
import MatchController from '../controllers/MatchController';
import MatchService from '../services/MatchService';

const matchRoute = express.Router();

const matchService = new MatchService();
const matchController = new MatchController(matchService);

matchRoute.post('/', matchController.create);
matchRoute.get('/', matchController.findAll);
matchRoute.patch('/:id/finish', matchController.finish);
matchRoute.patch('/:id', matchController.updateGoals);

export default matchRoute;
