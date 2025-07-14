import logic from '../../../logic/index.js'
import { createFunctionalHandler } from '../../helpers/index.js'

const addEventHandler = createFunctionalHandler((req, res) => {
    const { name, startDate, description, endDate, frequency } = req.body;
    const userId = req.user.id;

    return logic.addEvent(userId, name, startDate, description, endDate, frequency);
});

export default addEventHandler;
