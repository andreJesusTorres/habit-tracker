import logic from '../../../logic/index.js'
import { createFunctionalHandler } from '../../helpers/index.js'

const deleteHabitHandler = createFunctionalHandler((req, res) => {
    const { habitId } = req.params;
    const { userId } = req //const userId  = req.userId

    return logic.deleteHabit(userId, habitId );
});

export default deleteHabitHandler;
