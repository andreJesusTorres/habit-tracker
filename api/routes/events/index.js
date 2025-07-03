import { Router } from 'express';

import { authorizationHandler, jsonBodyParser } from '../helpers/index.js';
import {
    addEventHandler,
    deleteEventHandler,
    getEventsHandler,
    updateEventHandler
} from './handlers/index.js';

const eventsRouter = Router();

eventsRouter.post('/', authorizationHandler, jsonBodyParser, addEventHandler);
eventsRouter.delete('/', authorizationHandler, deleteEventHandler);
eventsRouter.get('/', authorizationHandler, getEventsHandler);
eventsRouter.patch('/', authorizationHandler, jsonBodyParser, updateEventHandler);

export default eventsRouter;
