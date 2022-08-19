import * as express from 'express';
import loginController from '../controllers/loginController';

const loginRoute = express.Router();

loginRoute.post('/', loginController.login);
loginRoute.get('/validate', loginController.validate);

export default loginRoute;
