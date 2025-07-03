import logic from '../../../logic/index.js';
import { createFunctionalHandler } from '../../helpers/index.js';

const updateHabitHandler = createFunctionalHandler((req, res) => {
    const { userId, name, emoji } = req.body;
    const { habitId } = req.params
    return logic.updateHabit(habitId, userId, { name, emoji }).then(( )=>res.status(200).send());
});

export default updateHabitHandler;