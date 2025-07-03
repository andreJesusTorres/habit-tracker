import { Router } from 'express';

import { authorizationHandler, jsonBodyParser } from '../helpers/index.js';

import {
    addProgressHandler,
    deleteProgressHandler,
    getProgressHandler,
    updateProgressHandler
} from './handlers/index.js'

const progressesRouter = Router();

progressesRouter.post('/', authorizationHandler, jsonBodyParser, addProgressHandler);
progressesRouter.get('/', authorizationHandler, getProgressHandler);
progressesRouter.put('/:progressId', authorizationHandler, jsonBodyParser, updateProgressHandler);
progressesRouter.delete('/:progressId', authorizationHandler, deleteProgressHandler);

export default progressesRouter;