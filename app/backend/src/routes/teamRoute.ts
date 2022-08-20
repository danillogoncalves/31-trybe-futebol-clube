import * as express from 'express';
import TeamController from '../controllers/TeamController';
import TeamService from '../services/TeamService';

const teamRoute = express.Router();

const teamService = new TeamService();
const teamController = new TeamController(teamService);

teamRoute.get('/', teamController.findAll);
teamRoute.get('/:id', teamController.findByPk);

export default teamRoute;
