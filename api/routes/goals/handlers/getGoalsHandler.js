import getGoals from '../../../logic/goals/getGoals.js';
import { createFunctionalHandler } from '../../helpers/index.js';

const getGoalsHandler = createFunctionalHandler(async (req, res) => {
    const { userId } = req.query;

    if (!userId) {
        throw new Error('userId es requerido');
    }

    const goals = await getGoals(userId);

    return {
        goals: goals
    };
});

export default getGoalsHandler;
