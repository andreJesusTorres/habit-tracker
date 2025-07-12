import logic from '../../../logic/index.js'
import { createFunctionalHandler } from '../../helpers/index.js'

const deleteHabitHandler = createFunctionalHandler((req, res) => {
    const userId = req.user.id;
    const { habitId } = req.params;
    return logic.deleteHabit(userId, habitId);
});

export default deleteHabitHandler;
