import * as express from 'express';
import MatchController from '../controllers/MatchController';
import MatchService from '../services/MatchService';

const matchRoute = express.Router();

const matchService = new MatchService();
const matchController = new MatchController(matchService);

matchRoute.get('/', matchController.findAll);

export default matchRoute;
