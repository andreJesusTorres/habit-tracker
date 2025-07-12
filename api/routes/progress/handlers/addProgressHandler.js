import logic from '../../../logic/index.js'
import { createFunctionalHandler } from '../../helpers/index.js'

const addProgressHandler = createFunctionalHandler((req, res) => {
    const userId = req.user.id;
    const { habitId, date, status } = req.body;

    return logic.addProgress(userId, habitId, date, status);
});

export default addProgressHandler;
