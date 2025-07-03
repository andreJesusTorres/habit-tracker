import { Router } from 'express';

import { authorizationHandler, jsonBodyParser } from '../helpers/index.js';

import {
    addGoalHandler,
    deleteGoalHandler,
    updateGoalHandler,
    getGoalsHandler
} from './handlers/index.js'

const goalsRouter = Router();

goalsRouter.post('/', authorizationHandler, jsonBodyParser, addGoalHandler);
goalsRouter.get('/', authorizationHandler, getGoalsHandler);
goalsRouter.put('/', authorizationHandler, jsonBodyParser, updateGoalHandler);
goalsRouter.delete('/:goalId', authorizationHandler, deleteGoalHandler);

export default goalsRouter;
