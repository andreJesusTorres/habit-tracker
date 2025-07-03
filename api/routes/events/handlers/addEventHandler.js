import logic from '../../../logic/index.js'
import { createFunctionalHandler } from '../../helpers/index.js'

const addEventHandler = createFunctionalHandler((req, res) => {
    const { userId, name, startDate, description, endDate, frequency } = req.body; // <-- Aquí estaba el error

    return logic.addEvent(userId, name, startDate, description, endDate, frequency);
});

export default addEventHandler;
