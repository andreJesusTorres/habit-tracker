import { Router } from 'express';

import { authorizationHandler, jsonBodyParser } from '../helpers/index.js';
import {
    addHabitHandler,
    getHabitsHandler,
    deleteHabitHandler,
    updateHabitHandler
} from './handlers/index.js'

const habitsRouter = Router();

habitsRouter.post('/', authorizationHandler, jsonBodyParser, addHabitHandler);
habitsRouter.get('/', authorizationHandler, getHabitsHandler);
habitsRouter.patch('/:habitId', authorizationHandler, jsonBodyParser, updateHabitHandler);
habitsRouter.delete('/:habitId', authorizationHandler, deleteHabitHandler);

export default habitsRouter;
