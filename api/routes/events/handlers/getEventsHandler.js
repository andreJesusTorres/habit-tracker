import logic from '../../../logic/index.js'
import { createFunctionalHandler } from '../../helpers/index.js'

const getEventsHandler = createFunctionalHandler((req, res) => {
    const { userId } = req;

 
   return logic.getEvents(userId).then((events) => res.json(events));
});

export default getEventsHandler;
