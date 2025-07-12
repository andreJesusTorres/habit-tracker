import logic from '../../../logic/index.js'
import { createFunctionalHandler } from '../../helpers/index.js'

const getEventsHandler = createFunctionalHandler((req, res) => {
    const { userId } = req;

    return logic.getEvents(userId);
});

export default getEventsHandler;
