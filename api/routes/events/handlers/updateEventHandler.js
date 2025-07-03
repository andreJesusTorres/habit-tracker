import logic from '../../../logic/index.js'
import { createFunctionalHandler } from '../../helpers/index.js'

const updateEventHandler = createFunctionalHandler((req, res) => {
    const { eventId, description, name, startDate, endDate, frequency  } = req.body;

    return logic.updateEvent(eventId, name, description, new Date(startDate), new Date (endDate), frequency).then(( )=>res.status(200).send()).catch(error=>res.status(500).send(error.message))
});

export default updateEventHandler;
