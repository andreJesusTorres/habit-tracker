import logic from '../../../logic/index.js'
import { createFunctionalHandler } from '../../helpers/index.js'

const deleteHabitHandler = createFunctionalHandler((req, res) => {
    const { habitId } = req.params;
    const { userId } = req;
    return logic.deleteHabit(userId, habitId ).then(() => res.status(204).send());
});

export default deleteHabitHandler;
