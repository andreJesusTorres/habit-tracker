import logic from '../../../logic/index.js'
import { createFunctionalHandler } from '../../helpers/index.js'

const deleteEventHandler = createFunctionalHandler((req, res) => {
    const { eventId } = req.params;
    const userId = req.user.id;

    return logic.deleteEvent(eventId, userId);
});

export default deleteEventHandler;
