import { Router } from 'express';
import { authorizationHandler, jsonBodyParser } from '../helpers/index.js';

import {
    registerUserHandler,
    authenticateUserHandler,
    getUserDetailsHandler
} from './handlers/index.js'

const usersRouter = Router();

usersRouter.post('/register', jsonBodyParser, registerUserHandler);
usersRouter.post('/auth', jsonBodyParser, authenticateUserHandler);
usersRouter.get('/details', authorizationHandler, getUserDetailsHandler);

export default usersRouter;