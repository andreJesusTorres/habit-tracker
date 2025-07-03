import logic from '../../../logic/index.js'
import { createFunctionalHandler } from '../../helpers/index.js'

const deleteEventHandler = createFunctionalHandler((req, res) => {
    const { eventId } = req.params;

    return logic.deleteEvent(eventId);
});

export default deleteEventHandler;
